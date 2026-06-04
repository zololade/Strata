import type { ItemData, ProjectData, StoredType, TaskData } from "../lib/Types";
import type { Item } from "./Item";
import type { Project } from "./Project";
import type { Task } from "./Task";
// serializer builds from project map
// it works with StoredType and build projects

function serializer(stored: StoredType<Project, Task, Item>): ProjectData[] {
  let projectAggregate: ProjectData[] = [];

  stored.projects.forEach((v, k) => {
    //the project object
    let project = {
      id: k,
      title: v.title,
      overview: v.overview,
      flag: v.flag,
      tasks: buildTask(v.tasks),
      createdAt: v.createdAt,
      lastModified: v.lastModified,
    };

    projectAggregate.push(project);
  });

  function buildTask(taskId: Set<string>): TaskData[] {
    let taskAggregate: TaskData[] = [];

    taskId.forEach((val) => {
      let currTask = stored.tasks.get(val);
      if (currTask) {
        let task = {
          id: currTask.id,
          title: currTask.title,
          overview: currTask.overview,
          flag: currTask.flag,
          items: buildItem(currTask.items),
        };
        taskAggregate.push(task);
      }
    });

    return taskAggregate;
  }

  function buildItem(itemId: Set<string>): ItemData[] {
    let itemAggregate: ItemData[] = [];

    itemId.forEach((val) => {
      let currItem = stored.items.get(val);
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

  return projectAggregate;
}

export { serializer };
