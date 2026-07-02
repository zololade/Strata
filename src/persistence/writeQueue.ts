import type { PersistOperation } from "../types/Types";
import { itemActions } from "./repositories/ItemRepository";
import { projectActions } from "./repositories/ProjectRepository";
import { taskActions } from "./repositories/TaskRepository";

const queue = new Set<PersistOperation>();

function enqueuePersist(operation: PersistOperation) {
  const queueLength = queue.size;
  queue.add(operation);
  if (queueLength < 1) {
    processQueue();
  }
}

async function processQueue() {
  let ref: PersistOperation | undefined = queue.values().next().value;
  if (!ref) return;

  if (ref.action === "put") {
    switch (ref.store) {
      case "projects":
        await projectActions.put(ref.payload);
        break;
      case "tasks":
        await taskActions.put(ref.payload);
        break;
      case "items":
        await itemActions.put(ref.payload);
        break;
    }
  } else {
    switch (ref.store) {
      case "projects":
        await projectActions.delete(ref.id);
        break;
      case "tasks":
        await taskActions.delete(ref.id);
        break;
      case "items":
        await itemActions.delete(ref.id);
        break;
    }
  }

  queue.delete(ref);
  processQueue();
}

export { enqueuePersist };
