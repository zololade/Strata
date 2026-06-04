import type { StoredType, ProjectInput } from "../lib/Types";
import type { Item } from "./Item";
import type { Task } from "./Task";
//Captial "I" > "Incoming"
class Project {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  tasks: Set<string>;
  createdAt: number;
  lastModified: number;
  store: StoredType<Project, Task, Item> | undefined;

  constructor(param: ProjectInput, store?: StoredType<Project, Task, Item>) {
    this.id = param.id ?? crypto.randomUUID();
    this.title = param.title;
    this.overview = param.overview;
    this.flag = param.flag;
    this.tasks = new Set(param.tasks);
    this.createdAt = param.createdAt ?? Date.now();
    this.lastModified = param.lastModified ?? 0;
    this.store = store;
  }
}

export { Project };
