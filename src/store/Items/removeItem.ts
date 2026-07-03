import type { EnqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";

function removeItem(
  store: StoredType,
  enqueuePersist: EnqueuePersist,
  payload: { itemId: string },
): Result {
  const { itemId } = payload;

  enqueuePersist({
    store: "items",
    action: "delete",
    id: itemId,
    onSuccess: () => {
      store.items.delete(itemId);
    },
  });

  return { type: "removedItem", id: itemId };
}

export { removeItem };
