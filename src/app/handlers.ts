import { bindStore } from "../core/state/Maps";
import { putProjects } from "../database/Database";

function handleDatabaseChange(data: unknown) {
  bindStore(data);
}

function handleDatabaseSave(data: unknown) {
  putProjects(data);
}

export { handleDatabaseChange, handleDatabaseSave };
