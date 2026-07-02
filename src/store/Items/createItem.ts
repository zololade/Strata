import { databaseBus } from "../../bootstrap/initializers/eventInit";
import type { Result } from "../../types/command";
import type { NewItemInput, StoredType } from "../../types/Types";
import { Item } from "./Item";

function createItem(store: StoredType, payload: NewItemInput): Result {
  const item = new Item(payload);

  databaseBus.publish("database:update", store);
  return { type: "createdItem", id: item.id };
}

export { createItem };
