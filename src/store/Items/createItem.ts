import { databaseBus } from "../../bootstrap/initializers/eventInit";
import type { Result } from "../../types/command";
import type { NewItemInput, StoredType } from "../../types/Types";
import { Item } from "./Item";

function createItem(
  store: StoredType,
  taskId: string,
  payload: NewItemInput,
): Result {
  const item = new Item(payload);
  const task = store.tasks.get(taskId);

  if (!task) return { type: "notFound", entity: "task" };
  task.items.add(item.id);
  store.items.set(item.id, item);
  databaseBus.publish("database:update", store);
  return { type: "createdItem", id: item.id };
}

export { createItem };
