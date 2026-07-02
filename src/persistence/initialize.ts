import type {
  DBCollection,
  ItemInstance,
  ProjectInstance,
  StoredType,
  TaskInstance,
} from "../types/Types";
import { databaseOpen, wrapper } from "./db";

async function openDatabase() {
  try {
    const db = await databaseOpen();
    return db;
  } catch (error) {
    let err = error as DOMException | null;
    if (err !== null) {
      throw new Error(err.message, { cause: error });
    } else {
      throw new Error("something went wrong", { cause: error });
    }
  }
}

const dbStore = (async function startUp(retryCount = 0) {
  retryCount++;
  try {
    return await openDatabase();
  } catch (error) {
    console.error(error);
    if (retryCount < 5) {
      return new Promise<IDBDatabase>((resolve) => {
        setTimeout(() => {
          resolve(startUp(retryCount));
        }, 1000);
      });
    } else {
      throw new Error("something went wrong", { cause: error });
    }
  }
})();

const startTransaction = async function (storeType: string) {
  return (await dbStore).transaction(storeType, "readwrite");
};

function getActions<T extends ProjectInstance | TaskInstance | ItemInstance>(STORE_TYPE: string) {
  return {
    get: async function (id: string) {
      const store = (await startTransaction(STORE_TYPE)).objectStore(STORE_TYPE).get(id);
      const result = await wrapper<T | undefined>(store);
      return result;
    },
    put: async function (payload: T) {
      const store = (await startTransaction(STORE_TYPE)).objectStore(STORE_TYPE).put(payload);
      const result = await wrapper(store);
      return result;
    },

    delete: async function (id: string) {
      const store = (await startTransaction(STORE_TYPE)).objectStore(STORE_TYPE).delete(id);
      const result = await wrapper(store);
      return result;
    },

    getAll: async function () {
      const store = (await startTransaction(STORE_TYPE)).objectStore(STORE_TYPE).getAll();
      const result = await wrapper<T[]>(store);
      return result;
    },
  };
}

function rehydrateFactory(data: DBCollection, store: StoredType) {
  const projects = new Map<string, ProjectInstance>();
  const tasks = new Map<string, TaskInstance>();
  const items = new Map<string, ItemInstance>();

  for (const v of data.items) {
    items.set(v.id, v);
  }
  for (const v of data.tasks) {
    tasks.set(v.id, v);
  }
  for (const v of data.projects) {
    projects.set(v.id, v);
  }

  store.projects = projects;
  store.tasks = tasks;
  store.items = items;
}

export { getActions, rehydrateFactory };
