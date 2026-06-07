import { bindStore, getStore } from "../store/Store";
import { putProjects } from "../data/dao";
import { initialRender } from "../ui";
import { appBus } from "../lib/Buses";
import { updateView } from "../ui/home/home";

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

function handleViewProject(data: unknown) {
  updateView(data, getStore());
}

export {
  handleDatabaseLoaded,
  handleDatabaseUpdate,
  handleStoreLoaded,
  handleViewProject,
};
