import { databaseBus } from "../../bootstrap/initializers/eventInit";
import type { Result } from "../../types/command";
import type { StoredType, TaskUpdate } from "../../types/Types";

function updateTask(
  store: StoredType,
  taskId: string,
  payload: TaskUpdate,
): Result {
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
    task.flag = payload.flag;
  }

  task.lastModified = Date.now();
  databaseBus.publish("database:update", store);
  return { type: "updatedTask", id: taskId };
}

export { updateTask };
