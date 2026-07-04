import type { EnqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";

type Payload = {
  itemId: string;
  onPersistSuccess?: () => void;
};

function removeItem(store: StoredType, enqueuePersist: EnqueuePersist, payload: Payload): Result {
  const { itemId } = payload;

  enqueuePersist({
    store: "items",
    action: "delete",
    id: itemId,
    onSuccess: () => {
      store.items.delete(itemId);
      if (payload.onPersistSuccess) payload.onPersistSuccess();
    },
  });

  return { type: "removedItem", id: itemId };
}

export { removeItem };
