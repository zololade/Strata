import { bindStore } from "../store/Store";
import { putProjects } from "../data/dao";

function handleDatabaseChange(data: unknown) {
  bindStore(data);
}

function handleDatabaseUpdate(data: unknown) {
  putProjects(data);
}

export { handleDatabaseChange, handleDatabaseUpdate };
