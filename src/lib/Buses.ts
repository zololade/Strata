import { EventBus } from "./EventBus";

const databaseBus = new EventBus();
const appBus = new EventBus();
const storeBus = new EventBus();

export { databaseBus, appBus, storeBus };
