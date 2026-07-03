import { appBus } from "../../bootstrap/initializers/eventInit";
import type { EnqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { NewTaskInput, StoredType } from "../../types/Types";
import { Task } from "./Task";

function createTask(
  store: StoredType,
  enqueuePersist: EnqueuePersist,
  payload: NewTaskInput,
): Result {
  const task = new Task(payload);

  enqueuePersist({
    store: "tasks",
    action: "put",
    payload: task,
    onSuccess: () => {
      store.tasks.set(task.id, task);
      appBus.publish("task:created", task.id);
    },
  });

  return {
    type: "createdTask",
    id: task.id,
  };
}

export { createTask };
