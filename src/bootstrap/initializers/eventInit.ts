import { EventBus } from "../../lib/EventBus";

const databaseBus = new EventBus();
const appBus = new EventBus();

import { createHandleProjectSelection } from "../../handlers/busHandlers/handlers";
import type { StoredType } from "../../types/Types";
import { createShowActiveProject } from "../../ui/reactions/selectionReaction";
import { createTitleReaction } from "../../ui/reactions/titleReaction";
import { createUpdateReaction } from "../../ui/reactions/updateReactions";
import type { createAppShell } from "../../ui/views/home";
type taskReactions = {
  refreshTask: (afterRender?: (() => void) | undefined) => void;
  refreshCurrTask: (id: string) => void;
};

function initializeServices(
  store: StoredType,
  ui: ReturnType<typeof createAppShell>,
  reactions: taskReactions,
) {
  const showActiveProject = createShowActiveProject({
    store,
    getPrevProjId: ui.getPrevProjId,
    setPrevProjId: ui.setPrevProjId,
  });

  const { handleTitleUpdated } = createTitleReaction();
  const handleProjectSelection = createHandleProjectSelection(showActiveProject);
  const { handleProjectCreated, handleTaskCreated, handleTaskUpdated } = createUpdateReaction(
    ui.refreshList,
    ui.selectProject,
    reactions.refreshTask,
    reactions.refreshCurrTask,
  );

  appBus.subscribe("view:project", handleProjectSelection);
  appBus.subscribe("project:title-updated", handleTitleUpdated);
  appBus.subscribe("project:created", handleProjectCreated);
  appBus.subscribe("task:created", handleTaskCreated);
  appBus.subscribe("task:updated", handleTaskUpdated);
}

export { databaseBus, appBus, initializeServices };
