import type { ItemData, ProjectData, StoredType, TaskData } from "../lib/Types";
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

  serializer(): ProjectData[] {
    let projectAggregate: ProjectData[] = [];

    this.stored.projects.forEach((v, k) => {
      //the project object
      let project = {
        id: k,
        title: v.title,
        overview: v.overview,
        flag: v.flag,
        tasks: this.hydrateTask(v.tasks),
        createdAt: v.createdAt,
        lastModified: v.lastModified,
      };

      projectAggregate.push(project);
    });

    return projectAggregate;
  }

  private hydrateTask(taskId: Set<string>): TaskData[] {
    let taskAggregate: TaskData[] = [];

    taskId.forEach((val) => {
      let currTask = this.stored.tasks.get(val);
      if (currTask) {
        let task = {
          id: currTask.id,
          title: currTask.title,
          overview: currTask.overview,
          flag: currTask.flag,
          items: this.hydrateItem(currTask.items),
        };
        taskAggregate.push(task);
      }
    });

    return taskAggregate;
  }

  private hydrateItem(itemId: Set<string>): ItemData[] {
    let itemAggregate: ItemData[] = [];

    itemId.forEach((val) => {
      let currItem = this.stored.items.get(val);
      if (currItem) {
        let item = {
          id: currItem.id,
          content: currItem.content,
          note: currItem.note,
          flag: currItem.flag,
        };

        itemAggregate.push(item);
      }
    });
    return itemAggregate;
  }
}

export { StoreReader };
