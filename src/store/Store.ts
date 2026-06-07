// project map shared state
import { loadSnapshot } from "../data/transformers/rehydrate";
import type { ItemInstance, ProjectInstance, TaskInstance } from "../lib/Types";

class ProjectStore {
  projects = new Map<string, ProjectInstance>();
  tasks = new Map<string, TaskInstance>();
  items = new Map<string, ItemInstance>();
}

let store = new ProjectStore();

function bindStore(data: unknown) {
  loadSnapshot(data, {
    projects: store.projects,
    tasks: store.tasks,
    items: store.items,
  });
}

function getStore() {
  return store;
}

export { store as storedProjects, bindStore, getStore };
