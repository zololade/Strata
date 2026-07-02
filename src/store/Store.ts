// store/Store.ts
import { rehydrateFactory } from "../persistence/initialize";
import { loadSnapshot } from "../storage/transformers/rehydrate";
import type { DBCollection, ItemInstance, ProjectInstance, TaskInstance } from "../types/Types";

class ProjectStore {
  projects = new Map<string, ProjectInstance>();
  tasks = new Map<string, TaskInstance>();
  items = new Map<string, ItemInstance>();
}

function createStore() {
  const store = new ProjectStore();

  function bind(data: unknown) {
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

  return { store, bind };
}
function createSnapshot() {
  const store = new ProjectStore();

  function bind(data: DBCollection) {
    if (data.projects.length < 1) {
      console.warn("No project data available — using empty store");
      return;
    }
    try {
      rehydrateFactory(data, {
        projects: store.projects,
        tasks: store.tasks,
        items: store.items,
      });
    } catch (err) {
      console.error("Failed to load project data:", err);
    }
  }

  return { store, bind };
}

export { type ProjectStore, createStore, createSnapshot };
