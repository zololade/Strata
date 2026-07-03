function createInitialize({ databaseOpen }: { databaseOpen: () => Promise<IDBDatabase> }) {
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

  async function getDbStore(retryCount = 0) {
    retryCount++;
    try {
      return await openDatabase();
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

  return {
    startTransaction,
  };
}

export { createInitialize };
