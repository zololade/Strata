// project map shared state
import { databaseBus } from "../lib/Buses";
import type { Project } from "./Project";
import type { Task } from "./Task";
import type { Item } from "./Item";
import { loadSnapshot } from "./transformer";

class ProjectStore {
  projects = new Map<string, Project>();
  tasks = new Map<string, Task>();
  items = new Map<string, Item>();
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
