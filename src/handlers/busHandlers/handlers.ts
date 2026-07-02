import { putProjects } from "../../storage/dao";

function handleDatabaseUpdate(data: unknown) {
  putProjects(data);
}

function createHandleProjectSelection(showActiveProject: (data: unknown) => void) {
  return function handleProjectSelection(data: unknown) {
    showActiveProject(data);
  };
}

export { handleDatabaseUpdate, createHandleProjectSelection };
