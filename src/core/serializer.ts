import type {
  ItemInput,
  ProjectInput,
  StoredType,
  TaskInput,
} from "../lib/Types";
import type { Item } from "./Item";
import type { Project } from "./Project";
import type { Task } from "./Task";
// serializer builds from project map
// it works with StoredType and build projects

class StoreReader {
  private stored: StoredType<Project, Task, Item>;
  constructor(stored: StoredType<Project, Task, Item>) {
    this.stored = stored;
  }

  hydrateProject(): ProjectInput[] {
    const result: ProjectInput[] = [];

    this.stored.projects.forEach((v, k) => {
      //the project object
      result.push({
        id: k,
        title: v.title,
        overview: v.overview,
        flag: v.flag,
        tasks: [...v.tasks],
        createdAt: v.createdAt,
        lastModified: v.lastModified,
      });
    });

    return result;
  }

  hydrateTask(): TaskInput[] {
    let result: TaskInput[] = [];

    this.stored.tasks.forEach((v, k) => {
      result.push({
        id: k,
        title: v.title,
        overview: v.overview,
        flag: v.flag,
        items: [...v.items],
      });
    });

    return result;
  }

  hydrateItem(): ItemInput[] {
    let result: ItemInput[] = [];

    this.stored.items.forEach((v, k) => {
      result.push({
        id: k,
        content: v.content,
        note: v.note,
        flag: v.flag,
      });
    });
    return result;
  }
}

export { StoreReader };
