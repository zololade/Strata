import type { EnqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { ItemUpdate, StoredType } from "../../types/Types";

function updateItem(
  store: StoredType,
  enqueuePersist: EnqueuePersist,
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
    const flag = new Set(item.flag);
    if (flag.has(payload.flag)) {
      flag.delete(payload.flag);
    } else {
      flag.add(payload.flag);
    }
    item.flag = [...flag];
  }

  item.lastModified = Date.now();

  enqueuePersist({
    store: "items",
    action: "put",
    payload: item,
    onSuccess: () => {
      store.items.set(item.id, item);
      if (payload.onPersistSuccess) payload.onPersistSuccess();
    },
  });

  return { type: "updatedItem", id: itemId };
}

export { updateItem };
