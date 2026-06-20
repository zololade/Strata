// transformer layer that populate instances and connect them
/*
Todo
- Snapshot versioning
- flag validation
*/
import type {
  ItemInstance,
  ProjectInstance,
  Snapshot,
  StoredType,
  TaskInstance,
} from "../../lib/Types";
import { isSnapshot } from "./typeGuards/guards";
import { Item } from "../../store/domainModels/Item";
import { Project } from "../../store/domainModels/Project";
import { Task } from "../../store/domainModels/Task";

function rehydrateFactory(data: Snapshot) {
  const projects = new Map<string, ProjectInstance>();
  const tasks = new Map<string, TaskInstance>();
  const items = new Map<string, ItemInstance>();

  for (const v of data.items) {
    checkDuplicate(items, v.id, "Items");
    items.set(v.id, new Item(v));
  }
  for (const v of data.tasks) {
    assertExists(items, v.items, "Items");
    checkDuplicate(tasks, v.id, "Task");
    tasks.set(v.id, new Task(v));
  }
  for (const v of data.projects) {
    assertExists(tasks, v.tasks, "Tasks");
    checkDuplicate(projects, v.id, "Projects");
    projects.set(v.id, new Project(v));
  }

  return { projects, tasks, items };
}

function loadSnapshot(incoming: unknown, store: StoredType) {
  if (!incoming || !isSnapshot(incoming)) {
    console.warn("Invalid or missing snapshot data");
    return;
  }

  const graph = rehydrateFactory(incoming);

  replaceMap(store.projects, graph.projects);
  replaceMap(store.tasks, graph.tasks);
  replaceMap(store.items, graph.items);
}

//helper
function replaceMap<T>(target: Map<string, T>, source: Map<string, T>) {
  target.clear();
  for (const [k, v] of source) {
    target.set(k, v);
  }
}

function assertExists<T>(map: Map<string, T>, ids: string[], label: string) {
  for (const id of ids) {
    if (!map.has(id)) {
      throw new Error(`Missing ${label} reference: ${id}`);
    }
  }
}
function checkDuplicate<T>(map: Map<string, T>, id: string, label: string) {
  if (map.has(id)) {
    throw new Error(`Duplicate Id:${id} detected in ${label}`);
  }
}
export { loadSnapshot, rehydrateFactory };
