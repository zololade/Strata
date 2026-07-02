import { EventBus } from "../../lib/EventBus";

const databaseBus = new EventBus();
const appBus = new EventBus();

import { createHandleProjectSelection } from "../../handlers/busHandlers/handlers";
import type { StoredType } from "../../types/Types";
import { createShowActiveProject } from "../../ui/reactions/selectionReaction";
import { createTitleReaction } from "../../ui/reactions/titleReaction";
import { createUpdateReaction } from "../../ui/reactions/updateReactions";
import type { createAppShell } from "../../ui/views/home";

function initializeServices(store: StoredType, ui: ReturnType<typeof createAppShell>) {
  const showActiveProject = createShowActiveProject({
    store,
    getPrevProjId: ui.getPrevProjId,
    setPrevProjId: ui.setPrevProjId,
  });

  const { handleTitleUpdated } = createTitleReaction();
  const handleProjectSelection = createHandleProjectSelection(showActiveProject);
  const handleProjectCreated = createUpdateReaction(ui.refreshList, ui.selectProject);

  appBus.subscribe("view:project", handleProjectSelection);
  appBus.subscribe("project:title-updated", handleTitleUpdated);
  appBus.subscribe("project:created", handleProjectCreated);
}

export { databaseBus, appBus, initializeServices };
