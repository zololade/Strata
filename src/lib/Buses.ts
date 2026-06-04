import { EventBus } from "./EventBus";

const databaseBus = new EventBus();
const appBus = new EventBus();

export { databaseBus, appBus };
