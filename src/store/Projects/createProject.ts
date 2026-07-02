import { enqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { NewProjectInput, StoredType } from "../../types/Types";
import { Project } from "./Project";

function createProject(store: StoredType, payload: NewProjectInput): Result {
  const project = new Project(payload);

  enqueuePersist({
    store: "projects",
    action: "put",
    payload: project,
    onSuccess: () => {
      store.projects.set(project.id, project);
    },
  });

  return { type: "createdProject", id: project.id };
}

export { createProject };
