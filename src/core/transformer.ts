// transformer layer that populate instances and connect them
import type { Snapshot } from "../lib/Types";
import { hasKeys } from "../lib/utils";
import { Item } from "./Item";
import { Project } from "./Project";
import { Task } from "./Task";

function rehydrateFactory(data: Snapshot) {
  const projects = new Map<string, Project>();
  const tasks = new Map<string, Task>();
  const items = new Map<string, Item>();

  data.tasks.forEach((t) => assertExists(items, t.items, "Item"));
  data.projects.forEach((p) => assertExists(tasks, p.tasks, "Task"));

  data.projects.forEach((v) => {
    projects.set(
      v.id,
      new Project({
        title: v.title,
        overview: v.overview,
        flag: v.flag,
        tasks: v.tasks,
        id: v.id,
        createdAt: v.createdAt,
        lastModified: v.lastModified,
      }),
    );
  });

  data.tasks.forEach((v) => {
    tasks.set(
      v.id,
      new Task({
        id: v.id,
        title: v.title,
        overview: v.overview,
        flag: v.flag,
        items: v.items,
      }),
    );
  });

  data.items.forEach((v) => {
    items.set(
      v.id,
      new Item({
        id: v.id,
        content: v.content,
        note: v.note,
        flag: v.flag,
      }),
    );
  });
  return { projects, tasks, items };
}

function loadSnapshot(
  incoming: unknown,
  store: {
    projects: Map<string, Project>;
    tasks: Map<string, Task>;
    items: Map<string, Item>;
  },
) {
  if (!isOutgoingType(incoming)) {
    throw new Error("Invalid project data");
  }
  const graph = rehydrateFactory(incoming);

  store.projects = graph.projects;
  store.tasks = graph.tasks;
  store.items = graph.items;
}

//helper
function isOutgoingType(value: unknown): value is Snapshot {
  if (!hasKeys(value, ["projects", "tasks", "items"])) return false;

  const v = value as any;

  return (
    Array.isArray(v.projects) &&
    Array.isArray(v.tasks) &&
    Array.isArray(v.items)
  );
}

function assertExists<T>(map: Map<string, T>, ids: string[], label: string) {
  for (const id of ids) {
    if (!map.has(id)) {
      throw new Error(`Missing ${label}: ${id}`);
    }
  }
}

export { loadSnapshot, rehydrateFactory };
