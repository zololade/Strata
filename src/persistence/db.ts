const DATABASE_NAME = "StrataDB";
const DB_VERSION = 1;
const PROJECT_STORE = "projects";
const TASK_STORE = "tasks";
const ITEM_STORE = "items";

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
  });
  return wrapper(request);
}

//helper
function wrapper<R>(request: IDBRequest<R>) {
  return new Promise<R>((resolve, reject) => {
    request.addEventListener("error", () => {
      reject(request.error);
    });
    request.addEventListener("success", () => {
      resolve(request.result);
    });
  });
}

export { databaseOpen, PROJECT_STORE, TASK_STORE, ITEM_STORE, wrapper };
