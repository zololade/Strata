import type { EventBus } from "../../lib/EventBus";
import type { EnqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { NewProjectInput, StoredType } from "../../types/Types";
import { Project } from "./Project";

function createProject(
  store: StoredType,
  enqueuePersist: EnqueuePersist,
  appBus: EventBus,
  payload: NewProjectInput,
): Result {
  const project = new Project(payload);

  enqueuePersist({
    store: "projects",
    action: "put",
    payload: project,
    onSuccess: () => {
      store.projects.set(project.id, project);
      appBus.publish("project:created", project.id);
    },
  });

  return { type: "createdProject", id: project.id };
}

export { createProject };
