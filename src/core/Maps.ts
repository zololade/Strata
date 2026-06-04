// project map shared state
import { databaseBus } from "../lib/Buses";
import { loadSnapshot } from "./transformer";
import type { ItemInstance, ProjectInstance, TaskInstance } from "../lib/Types";

class ProjectStore {
  projects = new Map<string, ProjectInstance>();
  tasks = new Map<string, TaskInstance>();
  items = new Map<string, ItemInstance>();
}

let store = new ProjectStore();

databaseBus.subscribe("database:change", (data) => {
  loadSnapshot(data, {
    projects: store.projects,
    tasks: store.tasks,
    items: store.items,
  });
});

export { store as storedProjects };
