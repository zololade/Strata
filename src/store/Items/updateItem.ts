import { databaseBus } from "../../bootstrap/initializers/eventInit";
import type { Result } from "../../types/command";
import type { ItemUpdate, StoredType } from "../../types/Types";

function updateItem(
  store: StoredType,
  itemId: string,
  payload: ItemUpdate,
): Result {
  //get the item then edit
  const item = store.items.get(itemId);
  if (!item) return { type: "notFound", entity: "item" };

  if (payload.content !== undefined) {
    item.content = payload.content;
  }

  if (payload.note !== undefined) {
    item.note = payload.note;
  }

  if (payload.flag !== undefined) {
    item.flag = payload.flag;
  }

  item.lastModified = Date.now();
  databaseBus.publish("database:update", store);
  return { type: "updatedItem", id: itemId };
}

export { updateItem };
