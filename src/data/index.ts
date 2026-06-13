import { databaseBus } from "../lib/Buses";
import { getStoredData } from "./dao";

function initializeDatabase() {
  databaseBus.publish("database:loaded", getStoredData());
}

export { initializeDatabase };
