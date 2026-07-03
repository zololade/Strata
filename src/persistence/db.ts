import type { ItemInstance, ProjectInstance, TaskInstance } from "../types/Types";
import type { Wrapper } from "./lib/wrapper";

function createDatabase(
  wrapper: Wrapper,
  customSeedData: { projects: ProjectInstance[]; tasks: TaskInstance[]; items: ItemInstance[] },
) {
  const DATABASE_NAME = "StrataDB";
  const DB_VERSION = 2;
  const PROJECT_STORE = "projects";
  const TASK_STORE = "tasks";
  const ITEM_STORE = "items";
  const META_STORE = "meta";

  function databaseOpen(): Promise<IDBDatabase> {
    const request = indexedDB.open(DATABASE_NAME, DB_VERSION);

    request.addEventListener("upgradeneeded", function () {
      const db = request.result;
      const projectStoreExist = db.objectStoreNames.contains(PROJECT_STORE);
      const taskStoreExist = db.objectStoreNames.contains(TASK_STORE);
      const itemStoreExist = db.objectStoreNames.contains(ITEM_STORE);
      const metaStoreExist = db.objectStoreNames.contains(META_STORE);

      if (!projectStoreExist) {
        db.createObjectStore(PROJECT_STORE, { keyPath: "id" });
      }
      if (!taskStoreExist) {
        db.createObjectStore(TASK_STORE, { keyPath: "id" });
      }
      if (!itemStoreExist) {
        db.createObjectStore(ITEM_STORE, { keyPath: "id" });
      }
      if (!metaStoreExist) {
        db.createObjectStore(META_STORE, { keyPath: "key" });
      }

      const newDB = request.transaction;
      if (newDB) {
        const metaStore = newDB.objectStore(META_STORE);
        const seededCheck = metaStore.get("seeded");

        seededCheck.onsuccess = () => {
          if (!seededCheck.result) {
            // Seed all stores
            seedIfEmpty(newDB.objectStore(PROJECT_STORE), customSeedData.projects);
            seedIfEmpty(newDB.objectStore(TASK_STORE), customSeedData.tasks);
            seedIfEmpty(newDB.objectStore(ITEM_STORE), customSeedData.items);
            metaStore.put({ key: "seeded", value: true });
          }
        };
        seededCheck.addEventListener("error", () => {
          console.error("Failed to check seeding status, skipping seed");
        });
      }
    });
    return wrapper(request);
  }
  return {
    databaseOpen,
    PROJECT_STORE,
    TASK_STORE,
    ITEM_STORE,
  };
}

////helper
function seedIfEmpty(
  store: IDBObjectStore,
  data: ProjectInstance[] | TaskInstance[] | ItemInstance[],
) {
  const countReq = store.count();
  countReq.onsuccess = () => {
    if (countReq.result === 0) {
      data.forEach((val) => {
        const putReq = store.put(val);
        putReq.addEventListener("error", () => console.error("Seed put failed", putReq.error));
      });
    }
  };
  countReq.addEventListener("error", () => console.error("Count failed", countReq.error));
}

export { createDatabase };
