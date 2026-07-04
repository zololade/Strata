import type { Wrapper } from "./lib/wrapper";

function createDatabase(wrapper: Wrapper) {
  const DATABASE_NAME = "StrataDB";
  const DB_VERSION = 2;
  const CURRENT_SEED_VERSION = 2;
  const PROJECT_STORE = "projects";
  const TASK_STORE = "tasks";
  const ITEM_STORE = "items";
  const META_STORE = "meta";

  function databaseOpen(): Promise<IDBDatabase> {
    const request = indexedDB.open(DATABASE_NAME, DB_VERSION);

    request.addEventListener("upgradeneeded", function () {
      const db = request.result;

      if (!db.objectStoreNames.contains(PROJECT_STORE)) {
        db.createObjectStore(PROJECT_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(TASK_STORE)) {
        db.createObjectStore(TASK_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(ITEM_STORE)) {
        db.createObjectStore(ITEM_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: "key" });
      }
    });
    return wrapper(request);
  }
  return {
    databaseOpen,
    PROJECT_STORE,
    TASK_STORE,
    ITEM_STORE,
    META_STORE,
    CURRENT_SEED_VERSION,
  };
}

export { createDatabase };
