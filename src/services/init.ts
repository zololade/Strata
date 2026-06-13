import { appBus, databaseBus } from "../lib/Buses";
import {
  handleDatabaseLoaded,
  handleDatabaseUpdate,
  handleProjectSelection,
  handleStoreLoaded,
} from "./handlers";

function initializeServices() {
  databaseBus.subscribe("database:loaded", handleDatabaseLoaded);
  databaseBus.subscribe("database:update", handleDatabaseUpdate);

  appBus.subscribe("store:ready", handleStoreLoaded);
  appBus.subscribe("view:project", handleProjectSelection);
}

export { initializeServices };
