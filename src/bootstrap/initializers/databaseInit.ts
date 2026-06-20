import { databaseBus } from "../../lib/Buses";
import { getStoredData } from "../../storage/dao";

function initializeDatabase() {
  databaseBus.publish("database:loaded", getStoredData());
}

export { initializeDatabase };
