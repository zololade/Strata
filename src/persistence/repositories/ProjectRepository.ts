import type { ProjectInstance } from "../../types/Types";
import { PROJECT_STORE, wrapper } from "../db";
import { startTransaction } from "../initialize";

async function get(id: string) {
  const store = (await startTransaction(PROJECT_STORE)).objectStore(PROJECT_STORE).get(id);
  const result = await wrapper<ProjectInstance | undefined>(store);
  return result;
}

async function put(payload: ProjectInstance) {
  const store = (await startTransaction(PROJECT_STORE)).objectStore(PROJECT_STORE).put(payload);
  const result = await wrapper(store);
  return result;
}

export { get, put };
