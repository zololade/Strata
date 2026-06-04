import { databaseBus } from "../lib/Buses";
import { getStoredData } from "./Database";

databaseBus.publish("database:change", getStoredData());
