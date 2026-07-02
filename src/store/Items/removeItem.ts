import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";

function removeItem(store: StoredType, payload: { itemId: string }): Result {
  const { itemId } = payload;
  store.items.delete(itemId);

  return { type: "removedItem", id: itemId };
}

export { removeItem };
