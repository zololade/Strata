import { databaseBus } from "../lib/Buses";
import { getStoredData } from "./dao";

databaseBus.publish("database:loaded", getStoredData());
