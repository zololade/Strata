import { databaseBus } from "../lib/Buses";
import { handleDatabaseChange, handleDatabaseSave } from "./handlers";

databaseBus.subscribe("database:change", handleDatabaseChange);
databaseBus.subscribe("database:save", handleDatabaseSave);
