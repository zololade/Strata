import { EventBus } from "../../lib/EventBus";

const databaseBus = new EventBus();
const appBus = new EventBus();

import type { StoreSelectors } from "../../store";
import { createFlagReaction } from "../../ui/reactions/flagReactions";
import { createShowActiveProject } from "../../ui/reactions/selectionReaction";
import { createTitleReaction } from "../../ui/reactions/titleReaction";
import { createUpdateReaction } from "../../ui/reactions/updateReactions";
import type { createAppShell } from "../../ui/views/home";
type taskReactions = {
  refreshTask: (afterRender?: (() => void) | undefined) => void;
  refreshCurrTask: (id: string) => void;
};

function initializeServices(
  selectors: StoreSelectors,
  ui: ReturnType<typeof createAppShell>,
  reactions: taskReactions,
) {
  const showActiveProject = createShowActiveProject({
    selectors,
    getPrevProjId: ui.getPrevProjId,
    setPrevProjId: ui.setPrevProjId,
  });

  const { handleTitleUpdated } = createTitleReaction();
  const { handleProjectCreated, handleTaskCreated, handleTaskUpdated } = createUpdateReaction(
    ui.refreshList,
    ui.selectProject,
    reactions.refreshTask,
    reactions.refreshCurrTask,
  );
  const { handleFlagToggled } = createFlagReaction(ui.getCurrProjId);

  appBus.subscribe("view:project", showActiveProject);
  appBus.subscribe("project:title-updated", handleTitleUpdated);
  appBus.subscribe("project:created", handleProjectCreated);
  appBus.subscribe("task:created", handleTaskCreated);
  appBus.subscribe("task:updated", handleTaskUpdated);
  appBus.subscribe("flag:toggled", handleFlagToggled);
}

export { databaseBus, appBus, initializeServices };
