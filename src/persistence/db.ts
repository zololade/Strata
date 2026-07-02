import { seedData } from "./seedData";

const DATABASE_NAME = "StrataDB";
const DB_VERSION = 1;
const PROJECT_STORE = "projects";
const TASK_STORE = "tasks";
const ITEM_STORE = "items";

function databaseOpen(): Promise<IDBDatabase> {
  const request = indexedDB.open(DATABASE_NAME, DB_VERSION);

  request.addEventListener("upgradeneeded", function () {
    const db = request.result;
    let newStoreCount = 0;

    if (!db.objectStoreNames.contains(PROJECT_STORE)) {
      newStoreCount++;
      db.createObjectStore(PROJECT_STORE, { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains(TASK_STORE)) {
      newStoreCount++;
      db.createObjectStore(TASK_STORE, { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains(ITEM_STORE)) {
      newStoreCount++;
      db.createObjectStore(ITEM_STORE, { keyPath: "id" });
    }
    if (newStoreCount === 3) {
      let newDB = request.transaction;
      if (newDB) {
        const project = newDB.objectStore(PROJECT_STORE);
        const task = newDB.objectStore(TASK_STORE);
        const item = newDB.objectStore(ITEM_STORE);

        seedData.projects.forEach((val) => project.put(val));
        seedData.tasks.forEach((val) => task.put(val));
        seedData.items.forEach((val) => item.put(val));
      }
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
