import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";

function removeTask(store: StoredType, payload: { taskId: string }): Result {
  const { taskId } = payload;
  //clean up items

  store.tasks.delete(taskId);

  return { type: "removedTask", id: taskId };
}

export { removeTask };
