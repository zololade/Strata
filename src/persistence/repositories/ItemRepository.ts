import type { ItemInstance } from "../../types/Types";
import { ITEM_STORE, wrapper } from "../db";
import { startTransaction } from "../initialize";

async function get(id: string) {
  const store = (await startTransaction(ITEM_STORE)).objectStore(ITEM_STORE).get(id);
  const result = await wrapper<ItemInstance | undefined>(store);
  return result;
}

export { get };
