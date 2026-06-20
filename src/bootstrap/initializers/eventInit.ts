import { EventBus } from "../../lib/EventBus";

const databaseBus = new EventBus();
const appBus = new EventBus();

import {
  createHandleDatabaseLoaded,
  createHandleProjectSelection,
  createHandleStoreLoaded,
  handleDatabaseUpdate,
} from "../../handlers/busHandlers/handlers";
import { createShowActiveProject } from "../../ui/reactions/selectionReaction";
import type { StoredType } from "../../types/Types";
import type { createAppShell } from "../../ui/views/home";
import { createTitleReaction } from "../../ui/reactions/titleReaction";

function initializeServices(
  store: StoredType,
  bind: (data: unknown) => void,
  ui: ReturnType<typeof createAppShell>,
) {
  const showActiveProject = createShowActiveProject({
    store,
    getPrevProjId: ui.getPrevProjId,
    setPrevProjId: ui.setPrevProjId,
  });

  const handleDatabaseLoaded = createHandleDatabaseLoaded(bind, store, appBus);
  const handleStoreLoaded = createHandleStoreLoaded(ui.appShell);
  const { handleTitleUpdated } = createTitleReaction();
  const handleProjectSelection =
    createHandleProjectSelection(showActiveProject);

  databaseBus.subscribe("database:loaded", handleDatabaseLoaded);
  databaseBus.subscribe("database:update", handleDatabaseUpdate);
  appBus.subscribe("store:ready", handleStoreLoaded);
  appBus.subscribe("view:project", handleProjectSelection);
  appBus.subscribe("project:title-updated", handleTitleUpdated);
}

export { databaseBus, appBus, initializeServices };
