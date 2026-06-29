import { EventBus } from "../../lib/EventBus";

const databaseBus = new EventBus();
const appBus = new EventBus();

import {
  createHandleDatabaseLoaded,
  createHandleProjectSelection,
  createHandleStoreLoaded,
  handleDatabaseUpdate,
} from "../../handlers/busHandlers/handlers";
import type { StoredType } from "../../types/Types";
import { createShowActiveProject } from "../../ui/reactions/selectionReaction";
import { createTitleReaction } from "../../ui/reactions/titleReaction";
import type { createAppShell } from "../../ui/views/home";

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
  const handleProjectSelection = createHandleProjectSelection(showActiveProject);

  databaseBus.subscribe("database:loaded", handleDatabaseLoaded);
  databaseBus.subscribe("database:update", handleDatabaseUpdate);
  appBus.subscribe("store:ready", handleStoreLoaded);
  appBus.subscribe("view:project", handleProjectSelection);
  appBus.subscribe("project:title-updated", handleTitleUpdated);
}

export { databaseBus, appBus, initializeServices };
