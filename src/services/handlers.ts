import { bindStore, getStore } from "../store/Store";
import { putProjects } from "../data/dao";
import { appBus } from "../lib/Buses";
import { appShell } from "../ui/home/home";

function handleDatabaseLoaded(data: unknown) {
  bindStore(data);

  appBus.publish("store:ready", getStore());
}

function handleDatabaseUpdate(data: unknown) {
  putProjects(data);
}

function handleStoreLoaded(_data: unknown) {
  appShell();
}

export { handleDatabaseLoaded, handleDatabaseUpdate, handleStoreLoaded };
