import { databaseBus } from "../lib/Buses";
import { getProjects } from "./Database";

databaseBus.publish("database:change", getProjects());
