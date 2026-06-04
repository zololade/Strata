// transformer layer that populate instances and connect them
import { databaseBus } from "../lib/Buses";
import type { ProjectData } from "../lib/Types";
import { Item } from "./Item";
import { ItemMap, ProjectMap, TaskMap } from "./Maps";
import { Project } from "./Project";
import { Task } from "./Task";

function isProject(value: unknown): value is ProjectData[] {
  if (Array.isArray(value) && value.length > 0) {
    let id = "id" in value[0];
    let title = "title" in value[0];
    let overview = "overview" in value[0];
    let tasks = "tasks" in value[0];

    return id && title && overview && tasks;
  }
  return false;
}

function transformer(incoming: unknown) {
  if (isProject(incoming)) {
    let data = incoming;
    data.forEach((val) => {
      let tasksArr: string[] = [];
      val.tasks.forEach((Tval) => {
        let itemsArr: string[] = [];
        tasksArr.push(Tval.id);

        Tval.items.forEach((Ival) => {
          itemsArr.push(Ival.id);

          ItemMap.set(
            Ival.id,
            new Item(
              Ival.content,
              Ival.note ? Ival.note : "",
              Ival.flag,
              Ival.id,
            ),
          );
        });

        TaskMap.set(
          Tval.id,
          new Task(Tval.title, Tval.overview, Tval.flag, itemsArr, Tval.id),
        );
      });

      ProjectMap.set(
        val.id,
        new Project(
          val.title,
          val.overview,
          val.flag,
          tasksArr,
          val.id,
          val.createdAt,
          val.lastModified,
        ),
      );
    });
  }
}

databaseBus.subscribe("database:change", transformer);
