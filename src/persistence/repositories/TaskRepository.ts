import type { TaskInstance } from "../../types/Types";
import { TASK_STORE, wrapper } from "../db";
import { startTransaction } from "../initialize";

async function get(id: string) {
  const store = (await startTransaction(TASK_STORE)).objectStore(TASK_STORE).get(id);
  const result = await wrapper<TaskInstance | undefined>(store);
  return result;
}
async function put(payload: TaskInstance) {
  const store = (await startTransaction(TASK_STORE)).objectStore(TASK_STORE).put(payload);
  const result = await wrapper(store);
  return result;
}
export { get, put };
