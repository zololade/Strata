import { EventBus } from "../../lib/EventBus";

const databaseBus = new EventBus();
const appBus = new EventBus();
const storeBus = new EventBus();

import {
  handleDatabaseLoaded,
  handleDatabaseUpdate,
  handleProjectSelection,
  handleStoreLoaded,
} from "../../handlers/busHandlers/handlers";

function initializeServices() {
  databaseBus.subscribe("database:loaded", handleDatabaseLoaded);
  databaseBus.subscribe("database:update", handleDatabaseUpdate);

  appBus.subscribe("store:ready", handleStoreLoaded);
  appBus.subscribe("view:project", handleProjectSelection);
}

export { databaseBus, appBus, storeBus, initializeServices };
