import { appBus, databaseBus } from "../lib/Buses";
import {
  handleDatabaseLoaded,
  handleDatabaseUpdate,
  handleStoreLoaded,
} from "./handlers";

databaseBus.subscribe("database:loaded", handleDatabaseLoaded);
databaseBus.subscribe("database:update", handleDatabaseUpdate);

appBus.subscribe("store:ready", handleStoreLoaded);
