import type { ItemInstance, ProjectInstance, TaskInstance } from "../types/Types";
import type { Wrapper } from "./lib/wrapper";

type Store = {
  PROJECT_STORE: string;
  TASK_STORE: string;
  ITEM_STORE: string;
  META_STORE: string;
};

function createInitialize(
  databaseOpen: () => Promise<IDBDatabase>,
  customSeedData: { projects: ProjectInstance[]; tasks: TaskInstance[]; items: ItemInstance[] },
  wrapper: Wrapper,
  { PROJECT_STORE, TASK_STORE, ITEM_STORE, META_STORE }: Store,
) {
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

  // oxlint-disable-next-line unicorn/consistent-function-scoping
  async function ensureSeeded(db: IDBDatabase) {
    const tx = db.transaction(META_STORE, "readwrite");
    const metaStore = tx.objectStore(META_STORE);

    const seededCheck = await wrapper(metaStore.get("seeded"));
    if (seededCheck) return; // Already seeded

    const seedTx = db.transaction([PROJECT_STORE, TASK_STORE, ITEM_STORE, META_STORE], "readwrite");
    await seedIfEmpty(seedTx.objectStore(PROJECT_STORE), customSeedData.projects);
    await seedIfEmpty(seedTx.objectStore(TASK_STORE), customSeedData.tasks);
    await seedIfEmpty(seedTx.objectStore(ITEM_STORE), customSeedData.items);
    const meta = seedTx.objectStore(META_STORE);

    await wrapper(meta.put({ key: "seeded", value: true }));

    await new Promise((resolve, reject) => {
      seedTx.addEventListener("complete", resolve);
      seedTx.addEventListener("error", reject);
    });
  }

  async function getDbStore(retryCount = 0) {
    retryCount++;
    try {
      const db = await openDatabase();
      await ensureSeeded(db);
      return db;
    } catch (error) {
      console.error(error);
      if (retryCount < 5) {
        return new Promise<IDBDatabase>((resolve) => {
          setTimeout(() => {
            resolve(getDbStore(retryCount));
          }, 1000);
        });
      } else {
        throw new Error("something went wrong", { cause: error });
      }
    }
  }

  const startTransaction = async function (storeType: string) {
    return (await getDbStore()).transaction(storeType, "readwrite");
  };

  // helper;
  async function seedIfEmpty(
    store: IDBObjectStore,
    data: ProjectInstance[] | TaskInstance[] | ItemInstance[],
  ) {
    const countReq = await wrapper(store.count());

    if (countReq === 0) {
      for (const val of data) {
        await wrapper(store.put(val));
      }
    }
  }

  return {
    startTransaction,
  };
}

export { createInitialize };
