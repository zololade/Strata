import { databaseBus } from "../../bootstrap/initializers/eventInit";
import type { Result } from "../../types/command";
import type { NewProjectInput, StoredType } from "../../types/Types";
import { Project } from "./Project";

function createProject(store: StoredType, payload: NewProjectInput): Result {
  const project = new Project(payload);
  store.projects.set(project.id, project);
  databaseBus.publish("database:update", store);
  return { type: "createdProject", id: project.id };
}

export { createProject };
