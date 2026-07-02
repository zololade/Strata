import { databaseOpen } from "./db";

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

export { startTransaction };
