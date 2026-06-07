import { appBus, databaseBus } from "../lib/Buses";
import {
  handleDatabaseLoaded,
  handleDatabaseUpdate,
  handleStoreLoaded,
  handleViewProject,
} from "./handlers";

databaseBus.subscribe("database:loaded", handleDatabaseLoaded);
databaseBus.subscribe("database:update", handleDatabaseUpdate);

appBus.subscribe("store:ready", handleStoreLoaded);
appBus.subscribe("view:project", handleViewProject);
