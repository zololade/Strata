import { bindStore, getStore } from "../../store/Store";
import { putProjects } from "../../storage/dao";
import { appBus } from "../../bootstrap/initializers/eventInit";
import { appShell } from "../../ui/views/home";
import { showActiveProject } from "../../ui/reactions/activeProject";

function handleDatabaseLoaded(data: unknown) {
  bindStore(data);

  appBus.publish("store:ready", getStore());
}

function handleDatabaseUpdate(data: unknown) {
  putProjects(data);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleStoreLoaded(_data: unknown) {
  appShell();
}

function handleProjectSelection(data: unknown) {
  showActiveProject(data);
}

export {
  handleDatabaseLoaded,
  handleDatabaseUpdate,
  handleStoreLoaded,
  handleProjectSelection,
};
