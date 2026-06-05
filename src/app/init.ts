import { databaseBus } from "../lib/Buses";
import { bindStore } from "../core/state/Maps";

databaseBus.subscribe("database:change", (data) => {
  bindStore(data);
});
