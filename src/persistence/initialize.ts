import type { ItemInstance, ProjectInstance, TaskInstance } from "../types/Types";
import type { Wrapper } from "./lib/wrapper";

type Store = {
  PROJECT_STORE: string;
  TASK_STORE: string;
  ITEM_STORE: string;
  META_STORE: string;
  CURRENT_SEED_VERSION: number;
};

function createInitialize(
  databaseOpen: () => Promise<IDBDatabase>,
  customSeedData: { projects: ProjectInstance[]; tasks: TaskInstance[]; items: ItemInstance[] },
  wrapper: Wrapper,
  { PROJECT_STORE, TASK_STORE, ITEM_STORE, META_STORE, CURRENT_SEED_VERSION }: Store,
) {
  // cache database
  let dbInstance: IDBDatabase | null = null;
  let openPromise: Promise<IDBDatabase> | null = null;
  let seedingDone = false;

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

    const seededCheck = await wrapper(metaStore.get("seed:version"));
    if (seededCheck === CURRENT_SEED_VERSION) return; // seed upto date

    const seedTx = db.transaction([PROJECT_STORE, TASK_STORE, ITEM_STORE, META_STORE], "readwrite");
    await seedIfEmpty(seedTx.objectStore(PROJECT_STORE), customSeedData.projects);
    await seedIfEmpty(seedTx.objectStore(TASK_STORE), customSeedData.tasks);
    await seedIfEmpty(seedTx.objectStore(ITEM_STORE), customSeedData.items);
    const meta = seedTx.objectStore(META_STORE);

    await wrapper(meta.put({ key: "seed:version", value: CURRENT_SEED_VERSION }));

    await new Promise((resolve, reject) => {
      seedTx.addEventListener("complete", resolve);
      seedTx.addEventListener("error", reject);
    });
  }

  async function getDbStore(retryCount = 0): Promise<IDBDatabase> {
    if (dbInstance) return dbInstance;
    if (openPromise) return openPromise;

    retryCount++;
    openPromise = (async () => {
      try {
        const db = await openDatabase();
        if (!seedingDone) {
          await ensureSeeded(db);
          seedingDone = true;
        }
        dbInstance = db;
        openPromise = null;
        return db;
      } catch (error) {
        openPromise = null;
        console.error(error);
        if (retryCount < 5) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return getDbStore(retryCount);
        }
        throw new Error("something went wrong", { cause: error });
      }
    })();

    return openPromise;
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
