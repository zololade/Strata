import type { ItemInstance, ProjectInstance, TaskInstance } from "../types/Types";
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
    const projectStoreExist = db.objectStoreNames.contains(PROJECT_STORE);
    const taskStoreExist = db.objectStoreNames.contains(TASK_STORE);
    const itemStoreExist = db.objectStoreNames.contains(ITEM_STORE);

    if (!projectStoreExist) {
      db.createObjectStore(PROJECT_STORE, { keyPath: "id" });
    }
    if (!taskStoreExist) {
      db.createObjectStore(TASK_STORE, { keyPath: "id" });
    }
    if (!itemStoreExist) {
      db.createObjectStore(ITEM_STORE, { keyPath: "id" });
    }

    const newDB = request.transaction;
    if (newDB) {
      seedIfEmpty(newDB.objectStore(PROJECT_STORE), seedData.projects);
      seedIfEmpty(newDB.objectStore(TASK_STORE), seedData.tasks);
      seedIfEmpty(newDB.objectStore(ITEM_STORE), seedData.items);
    }
  });
  return wrapper(request);
}

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
