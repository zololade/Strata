// transformer layer that populate instances and connect them
import type { Snapshot, StoredType } from "../lib/Types";
import { hasKeys } from "../lib/utils";
import { Item } from "./Item";
import { Project } from "./Project";
import { Task } from "./Task";

function rehydrateFactory(data: Snapshot) {
  const projects = new Map<string, Project>();
  const tasks = new Map<string, Task>();
  const items = new Map<string, Item>();

  for (const v of data.items) {
    items.set(v.id, new Item(v));
  }
  for (const v of data.tasks) {
    tasks.set(v.id, new Task(v));
  }
  for (const v of data.projects) {
    projects.set(v.id, new Project(v));
  }

  return { projects, tasks, items };
}

function loadSnapshot(
  incoming: unknown,
  store: StoredType<Project, Task, Item>,
) {
  if (!isSnapshot(incoming)) throw new Error("Invalid project data");

  const graph = rehydrateFactory(incoming);

  replaceMap(store.projects, graph.projects);
  replaceMap(store.tasks, graph.tasks);
  replaceMap(store.items, graph.items);
}

//helper
function isSnapshot(value: unknown): value is Snapshot {
  if (!hasKeys(value, ["projects", "tasks", "items"])) return false;
  const v = value;
  return (
    Array.isArray(v.projects) &&
    Array.isArray(v.tasks) &&
    Array.isArray(v.items)
  );
}

function replaceMap<T>(target: Map<string, T>, source: Map<string, T>) {
  target.clear();
  for (const [k, v] of source) {
    target.set(k, v);
  }
}

export { loadSnapshot, rehydrateFactory };
