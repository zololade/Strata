import { appBus } from "../../bootstrap/initializers/eventInit";
import { enqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { StoredType, TaskUpdate } from "../../types/Types";

function updateTask(store: StoredType, taskId: string, payload: TaskUpdate): Result {
  //get the task then edit
  const task = store.tasks.get(taskId);
  if (!task) return { type: "notFound", entity: "task" };

  if (payload.title !== undefined) {
    task.title = payload.title;
  }

  if (payload.overview !== undefined) {
    task.overview = payload.overview;
  }

  if (payload.flag !== undefined) {
    const flag = new Set(task.flag);
    if (flag.has(payload.flag)) {
      flag.delete(payload.flag);
    } else {
      flag.add(payload.flag);
    }
    task.flag = [...flag];
  }

  task.lastModified = Date.now();

  enqueuePersist({
    store: "tasks",
    action: "put",
    payload: task,
    onSuccess: () => {
      store.projects.set(task.id, task);
      appBus.publish("task:updated", task.id);
    },
  });

  return { type: "updatedTask", id: taskId };
}

export { updateTask };
