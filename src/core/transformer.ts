// transformer layer that populate instances and connect them
import type {
  Snapshot,
  StoredType,
  ItemInput,
  ProjectInput,
  TaskInput,
} from "../lib/Types";
import { hasKeys } from "../lib/utils";
import { Item } from "./Item";
import { Project } from "./Project";
import { Task } from "./Task";

function rehydrateFactory(data: Snapshot) {
  const projects = new Map<string, Project>();
  const tasks = new Map<string, Task>();
  const items = new Map<string, Item>();

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
function isItem(v: unknown): v is ItemInput {
  return (
    hasKeys(v, ["id", "content", "flag", "note"]) &&
    typeof v.id === "string" &&
    typeof v.content === "string" &&
    (v.note === null || typeof v.note === "string")
  );
}

function isTask(v: unknown): v is TaskInput {
  return (
    hasKeys(v, ["id", "title", "overview", "flag", "items"]) &&
    typeof v.id === "string" &&
    typeof v.title === "string" &&
    typeof v.overview === "string" &&
    Array.isArray(v.items) &&
    v.items.every((id) => typeof id === "string")
  );
}

function isProject(v: unknown): v is ProjectInput {
  return (
    hasKeys(v, [
      "id",
      "title",
      "overview",
      "flag",
      "tasks",
      "createdAt",
      "lastModified",
    ]) &&
    typeof v.id === "string" &&
    typeof v.title === "string" &&
    typeof v.overview === "string" &&
    typeof v.createdAt === "number" &&
    typeof v.lastModified === "number" &&
    Array.isArray(v.tasks) &&
    v.tasks.every((id) => typeof id === "string")
  );
}
function isSnapshot(value: unknown): value is Snapshot {
  if (!hasKeys(value, ["projects", "tasks", "items"])) return false;
  const v = value;
  return (
    Array.isArray(v.projects) &&
    Array.isArray(v.tasks) &&
    Array.isArray(v.items) &&
    v.projects.every(isProject) &&
    v.tasks.every(isTask) &&
    v.items.every(isItem)
  );
}

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
