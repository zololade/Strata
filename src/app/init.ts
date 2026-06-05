import { databaseBus } from "../lib/Buses";
import { handleDatabaseChange } from "./handlers";

databaseBus.subscribe("database:change", handleDatabaseChange);
