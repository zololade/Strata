import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";

function removeItem(store: StoredType, payload: { taskId: string; itemId: string }): Result {
  const { taskId, itemId } = payload;
  store.items.delete(itemId);
  const task = store.tasks.get(taskId);

  if (!task) return { type: "notFound", entity: "task" };
  task.items.delete(itemId);

  return { type: "removedItem", id: itemId };
}

export { removeItem };
