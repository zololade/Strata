// persistence/index.ts
import type { ProjectInstance, TaskInstance, ItemInstance } from "../types/Types";
import { createDatabase } from "./db";
import { createInitialize } from "./initialize";
import { getActions } from "./lib/getActions";
import { rehydrateFactory } from "./lib/rehydrate";
import { wrapper } from "./lib/wrapper";
import { seedData as defaultSeedData } from "./seedData";
import { createWriteQueue } from "./writeQueue";

export function createPersistence(customSeedData = defaultSeedData) {
  // 1. Open database connection (with seeding)
  const { databaseOpen, PROJECT_STORE, TASK_STORE, ITEM_STORE } = createDatabase(
    wrapper,
    customSeedData,
  );

  // 2. Lazy transaction starter
  const { startTransaction } = createInitialize({ databaseOpen });

  // 3. Create CRUD actions for each store
  const projectActions = getActions<ProjectInstance>(PROJECT_STORE, startTransaction, wrapper);
  const taskActions = getActions<TaskInstance>(TASK_STORE, startTransaction, wrapper);
  const itemActions = getActions<ItemInstance>(ITEM_STORE, startTransaction, wrapper);

  // 4. Write queue (persistence ordering)
  const { enqueuePersist } = createWriteQueue({
    projectActions,
    taskActions,
    itemActions,
  });

  // 5. Expose everything
  return {
    projectActions,
    taskActions,
    itemActions,
    enqueuePersist,
    rehydrate: rehydrateFactory, // pure function, no DB dependency
  };
}
