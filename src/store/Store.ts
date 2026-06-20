// project map shared state
import { loadSnapshot } from "../storage/transformers/rehydrate";
import type { ItemInstance, ProjectInstance, TaskInstance } from "../lib/Types";

class ProjectStore {
  projects = new Map<string, ProjectInstance>();
  tasks = new Map<string, TaskInstance>();
  items = new Map<string, ItemInstance>();
}

const store = new ProjectStore();

function bindStore(data: unknown) {
  if (!data) {
    console.warn("No project data available — using empty store");
    return;
  }

  try {
    loadSnapshot(data, {
      projects: store.projects,
      tasks: store.tasks,
      items: store.items,
    });
  } catch (err) {
    console.error("Failed to load project data:", err);
  }
}

function getStore() {
  return store;
}

export { bindStore, getStore };
