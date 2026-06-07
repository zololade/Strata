import { bindStore, getStore } from "../store/Store";
import { putProjects } from "../data/dao";
import { initialRender } from "../ui";
import { appBus } from "../lib/Buses";

function handleDatabaseLoaded(data: unknown) {
  bindStore(data);

  appBus.publish("store:ready", getStore());
}

function handleDatabaseUpdate(data: unknown) {
  putProjects(data);
}

function handleStoreLoaded(data: unknown) {
  initialRender(data);
}
export { handleDatabaseLoaded, handleDatabaseUpdate, handleStoreLoaded };
