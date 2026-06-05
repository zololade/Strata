import { bindStore } from "../core/state/Maps";

function handleDatabaseChange(data: unknown) {
  bindStore(data);
}

export { handleDatabaseChange };
