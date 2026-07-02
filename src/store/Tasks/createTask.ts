import { enqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { NewTaskInput, StoredType } from "../../types/Types";
import { Task } from "./Task";

function createTask(store: StoredType, payload: NewTaskInput): Result {
  const task = new Task(payload);

  enqueuePersist({
    store: "tasks",
    action: "put",
    payload: task,
    onSuccess: () => {
      store.tasks.set(task.id, task);
    },
  });

  return {
    type: "createdTask",
    id: task.id,
  };
}

export { createTask };
