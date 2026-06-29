import { getStoredData } from "../../storage/dao";
import { databaseBus } from "./eventInit";

function initializeDatabase() {
  databaseBus.publish("database:loaded", getStoredData());
}

export { initializeDatabase };
