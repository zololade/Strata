import type { ItemInstance, ProjectInstance, TaskInstance } from "../../types/Types";
import type { Wrapper } from "./wrapper";

interface Actions<T> {
  get: (id: string) => Promise<T | undefined>;
  put: (payload: T) => Promise<IDBValidKey>;
  delete: (id: string) => Promise<undefined>;
  getAll: () => Promise<T[]>;
}

// oxlint-disable-next-line unicorn/consistent-function-scoping
function getActions<T extends ProjectInstance | TaskInstance | ItemInstance>(
  STORE_TYPE: string,
  transaction: (storeType: string) => Promise<IDBTransaction>,
  wrapper: Wrapper,
) {
  return {
    get: async function (id: string) {
      const store = (await transaction(STORE_TYPE)).objectStore(STORE_TYPE).get(id);
      const result = await wrapper<T | undefined>(store);
      return result;
    },
    put: async function (payload: T) {
      const store = (await transaction(STORE_TYPE)).objectStore(STORE_TYPE).put(payload);
      const result = await wrapper(store);
      return result;
    },

    delete: async function (id: string) {
      const store = (await transaction(STORE_TYPE)).objectStore(STORE_TYPE).delete(id);
      const result = await wrapper(store);
      return result;
    },

    getAll: async function () {
      const store = (await transaction(STORE_TYPE)).objectStore(STORE_TYPE).getAll();
      const result = await wrapper<T[]>(store);
      return result;
    },
  };
}

export { getActions, type Actions };
