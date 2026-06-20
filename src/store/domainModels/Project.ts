import type {
  NewProjectInput,
  ProjectInput,
  ProjectUpdate,
  StoredType,
} from "../../types/Types";
import { databaseBus } from "../../lib/Buses";
import type { Result } from "../../types/command";
import { Task } from "./Task";

class Project {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  tasks: Set<string>;
  createdAt: number;
  lastModified: number;

  constructor(param: NewProjectInput | ProjectInput) {
    this.id = "id" in param ? param.id : crypto.randomUUID();
    this.title = param.title;
    this.overview = param.overview;
    this.flag = param.flag;
    this.tasks = new Set(param.tasks);
    this.createdAt = "createdAt" in param ? param.createdAt : Date.now();
    this.lastModified = "lastModified" in param ? param.lastModified : 0;
  }

  static createProject(store: StoredType, payload: NewProjectInput): Result {
    const project = new Project(payload);
    store.projects.set(project.id, project);
    databaseBus.publish("database:update", store);
    return { type: "createdProject", id: project.id };
  }

  static removeProject(
    store: StoredType,
    payload: { projectId: string },
  ): Result {
    const { projectId } = payload;
    //clean up tasks
    const tasks = store.projects.get(projectId)?.tasks;
    if (tasks)
      [...tasks].forEach((task) => {
        const newPayload = {
          taskId: task,
          projectId: projectId,
        };
        Task.removeTask(store, newPayload);
      });

    //remove project
    store.projects.delete(projectId);
    return { type: "removedProject", id: projectId };
  }

  static updateProject(
    store: StoredType,
    projectId: string,
    payload: ProjectUpdate,
  ): Result {
    //get the project then edit
    const project = store.projects.get(projectId);
    if (!project) return { type: "notFound", entity: "project" };

    if (payload.title !== undefined) {
      project.title = payload.title;
    }

    if (payload.overview !== undefined) {
      project.overview = payload.overview;
    }

    if (payload.flag !== undefined) {
      project.flag = payload.flag;
    }

    project.lastModified = Date.now();
    databaseBus.publish("database:update", store);
    return { type: "updatedProject", id: projectId };
  }
}

export { Project };
