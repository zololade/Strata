// bootstrap/init.ts
import { createStore } from "../store/Store";
import { createDispatch } from "../store/dispatch";
import {
  initializeServices,
  appBus,
  //   databaseBus,
} from "./initializers/eventInit";
import { initializeDatabase } from "./initializers/databaseInit";
import { createAppShell } from "../ui/views/home";
import { createTaskReactions } from "../ui/reactions/taskReaction";
import { initializeEvents, type HandlersByEvent } from "../ui/eventDelegation";

// domHandlers factories
import { createHandleCreateProj, createHandleCreateTask } from "../handlers/domHandlers/createNew";
import { createHandleSelectProj } from "../handlers/domHandlers/viewProject";
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
import { handleNavBtn, handleNavClose } from "../handlers/domHandlers/navTrigger";
import { handleOpenModal, handleHideModal } from "../handlers/domHandlers/newProjModal";

function init() {
  const { store, bind } = createStore();
  const dispatch = createDispatch(store);
  const ui = createAppShell(store, appBus);

  initializeServices(store, bind, ui); // wires database/store/project-selection events, calls ui.appShell() on store:ready

  const taskReactions = createTaskReactions({
    store,
    getCurrProjId: ui.getCurrProjId,
  });

  const handlers: HandlersByEvent = {
    click: {
      "create-project": createHandleCreateProj({
        dispatch,
        refreshList: ui.refreshList,
        selectProject: ui.selectProject,
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

  initializeEvents(handlers);
  initializeDatabase();
}

export { init };
