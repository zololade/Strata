import { databaseBus } from "./eventInit";
import { getStoredData } from "../../storage/dao";

function initializeDatabase() {
  databaseBus.publish("database:loaded", getStoredData());
}

export { initializeDatabase };
