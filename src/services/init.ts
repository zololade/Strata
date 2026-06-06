import { databaseBus } from "../lib/Buses";
import { handleDatabaseChange, handleDatabaseUpdate } from "./handlers";

databaseBus.subscribe("database:changed", handleDatabaseChange);
databaseBus.subscribe("database:update", handleDatabaseUpdate);
