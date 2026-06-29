// domHandlers factories
import { createHandleCreateProj, createHandleCreateTask } from "../handlers/domHandlers/createNew";
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
import { createDispatch } from "../store/dispatch";
// bootstrap/init.ts
import { createStore } from "../store/Store";
import { initializeEvents, type HandlersByEvent } from "../ui/eventDelegation";
import { createTaskReactions } from "../ui/reactions/taskReaction";
import { createAppShell } from "../ui/views/home";
import { initializeDatabase } from "./initializers/databaseInit";
import {
  initializeServices,
  appBus,
  //   databaseBus,
} from "./initializers/eventInit";

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
