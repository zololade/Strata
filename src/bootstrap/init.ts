// domHandlers factories
import { createHandleCreateProj, createHandleCreateTask } from "../handlers/domHandlers/createNew";
import { createHandleShowMenu, handleCloseMenu } from "../handlers/domHandlers/menuHandler";
import { handleNavBtn, handleNavClose } from "../handlers/domHandlers/navTrigger";
import { handleOpenModal, handleHideModal } from "../handlers/domHandlers/newProjModal";
import {
  createHandleUpdateTitle,
  createHandleUpdateOverview,
  createHandleUpdateTaskTitle,
  createHandleUpdateTaskOverview,
  handlePreventNewLine,
  handlePasteAsPlainText,
  createHandleUpdateFlag,
  createHandleUpdateTaskFlag,
} from "../handlers/domHandlers/updateFields";
import { createHandleSelectProj } from "../handlers/domHandlers/viewProject";
import { rehydrateFactory } from "../persistence/initialize";
import { itemActions } from "../persistence/repositories/ItemRepository";
import { projectActions } from "../persistence/repositories/ProjectRepository";
import { taskActions } from "../persistence/repositories/TaskRepository";
import { createDispatch } from "../store/dispatch";
// bootstrap/init.ts
import { createSnapshot } from "../store/Store";
import { initializeEvents, type HandlersByEvent } from "../ui/eventDelegation";
import { showMenu } from "../ui/reactions/menuReaction";
import { createTaskReactions } from "../ui/reactions/taskReaction";
import { createAppShell } from "../ui/views/home";
import { initializeServices, appBus } from "./initializers/eventInit";

async function init() {
  const { store, bind } = createSnapshot(rehydrateFactory);
  const loadState = {
    projects: await projectActions.getAll(),
    tasks: await taskActions.getAll(),
    items: await itemActions.getAll(),
  };

  const dispatch = createDispatch(store);
  const ui = createAppShell(store, appBus);

  initializeServices(store, ui); // wires database/store/project-selection events, calls ui.appShell() on store:ready

  const taskReactions = createTaskReactions({
    store,
    getCurrProjId: ui.getCurrProjId,
  });

  const handlers: HandlersByEvent = {
    click: {
      "create-project": createHandleCreateProj({
        dispatch,
      }),
      "create-task": createHandleCreateTask({
        dispatch,
        refreshTask: taskReactions.refreshTask,
        getCurrProjId: ui.getCurrProjId,
      }),
      "toggle-flag": createHandleUpdateFlag({
        dispatch,
        getCurrProjId: ui.getCurrProjId,
      }),
      "toggle-task-flag": createHandleUpdateTaskFlag({
        dispatch,
        refreshCurrTask: taskReactions.refreshCurrTask,
      }),
      "open-modal": handleOpenModal,
      "close-modal": handleHideModal,
      "select-project": createHandleSelectProj(ui.selectProject),
      "show-nav": handleNavBtn,
      "close-nav": handleNavClose,
      "toggle-kebab": createHandleShowMenu(showMenu),
      "menu-close": handleCloseMenu,
    },
    focusout: {
      "update-title": createHandleUpdateTitle({
        dispatch,
        getCurrProjId: ui.getCurrProjId,
        bus: appBus,
      }),
      "update-overview": createHandleUpdateOverview({
        dispatch,
        getCurrProjId: ui.getCurrProjId,
      }),
      "update-task-title": createHandleUpdateTaskTitle({
        dispatch,
        refreshCurrTask: taskReactions.refreshCurrTask,
      }),
      "update-task-overview": createHandleUpdateTaskOverview({
        dispatch,
        refreshCurrTask: taskReactions.refreshCurrTask,
      }),
    },
    beforeinput: {
      "prevent-newline": handlePreventNewLine,
    },
    paste: {
      "paste-plain-text": handlePasteAsPlainText,
    },
  };

  bind(loadState);
  ui.appShell();
  initializeEvents(handlers);
}

export { init };
