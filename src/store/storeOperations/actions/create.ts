import type { ProjectInput, StoredType } from "../../../lib/Types";
import { Project } from "../../models/Project";

const createHandler = {
  createProject(store: StoredType, payload: ProjectInput) {
    let project = new Project(payload);
    store.projects.set(project.id, project);
    return project;
  },
};

export { createHandler };
