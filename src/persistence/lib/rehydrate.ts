import type {
  DBCollection,
  ItemInstance,
  ProjectInstance,
  StoredType,
  TaskInstance,
} from "../../types/Types";

function rehydrateFactory(data: DBCollection, store: StoredType) {
  const projects = new Map<string, ProjectInstance>();
  const tasks = new Map<string, TaskInstance>();
  const items = new Map<string, ItemInstance>();

  for (const v of data.items) {
    items.set(v.id, v);
  }
  for (const v of data.tasks) {
    tasks.set(v.id, v);
  }
  for (const v of data.projects) {
    projects.set(v.id, v);
  }

  store.projects = projects;
  store.tasks = tasks;
  store.items = items;
}

export { rehydrateFactory };
