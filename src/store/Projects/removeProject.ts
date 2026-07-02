import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";

function removeProject(store: StoredType, payload: { projectId: string }): Result {
  const { projectId } = payload;

  //remove project
  store.projects.delete(projectId);
  return { type: "removedProject", id: projectId };
}

export { removeProject };
