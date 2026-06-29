import type { EventBus } from "../../lib/EventBus";
import { putProjects } from "../../storage/dao";
import type { StoredType } from "../../types/Types";

function createHandleDatabaseLoaded(
  bind: (data: unknown) => void,
  store: StoredType,
  appBus: EventBus,
) {
  return function handleDatabaseLoaded(data: unknown) {
    bind(data);
    appBus.publish("store:ready", store);
  };
}

function handleDatabaseUpdate(data: unknown) {
  putProjects(data);
}

function createHandleStoreLoaded(appShell: () => void) {
  return function handleStoreLoaded(_data: unknown) {
    appShell();
  };
}

function createHandleProjectSelection(showActiveProject: (data: unknown) => void) {
  return function handleProjectSelection(data: unknown) {
    showActiveProject(data);
  };
}

export {
  createHandleDatabaseLoaded,
  handleDatabaseUpdate,
  createHandleStoreLoaded,
  createHandleProjectSelection,
};
