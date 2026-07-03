import type { EnqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { NewItemInput, StoredType } from "../../types/Types";
import { Item } from "./Item";

function createItem(
  store: StoredType,
  enqueuePersist: EnqueuePersist,
  payload: NewItemInput,
): Result {
  const item = new Item(payload);

  enqueuePersist({
    store: "items",
    action: "put",
    payload: item,
    onSuccess: () => {
      store.items.set(item.id, item);
    },
  });

  return { type: "createdItem", id: item.id };
}

export { createItem };
