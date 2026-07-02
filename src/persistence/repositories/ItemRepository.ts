import type { ItemInstance } from "../../types/Types";
import { ITEM_STORE, wrapper } from "../db";
import { startTransaction } from "../initialize";

async function get(id: string) {
  const store = (await startTransaction(ITEM_STORE)).objectStore(ITEM_STORE).get(id);
  const result = await wrapper<ItemInstance | undefined>(store);
  return result;
}

async function put(payload: ItemInstance) {
  const store = (await startTransaction(ITEM_STORE)).objectStore(ITEM_STORE).put(payload);
  const result = await wrapper(store);
  return result;
}
export { get, put };
