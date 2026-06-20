import { databaseBus } from "../../bootstrap/initializers/eventInit";
import type { Result } from "../../types/command";
import type { ProjectUpdate, StoredType } from "../../types/Types";

function updateProject(
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

export { updateProject };
