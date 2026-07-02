// store/Store.ts
import type {
  DBCollection,
  ItemInstance,
  ProjectInstance,
  StoredType,
  TaskInstance,
} from "../types/Types";

class ProjectStore implements StoredType {
  projects = new Map<string, ProjectInstance>();
  tasks = new Map<string, TaskInstance>();
  items = new Map<string, ItemInstance>();
}

function createSnapshot(rehydrateFactory: (data: DBCollection, store: StoredType) => void) {
  const store = new ProjectStore();

  function bind(data: DBCollection) {
    try {
      rehydrateFactory(data, store);
    } catch (err) {
      console.error("Failed to load project data:", err);
    }
  }

  return { store, bind };
}

export { type ProjectStore, createSnapshot };
