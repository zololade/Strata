import type { Command, Result } from "../types/command";
import { showMenu } from "../ui/reactions/menuReaction";
import { createHandleCreateProj, createHandleCreateTask } from "./domHandlers/createNew";
import { createHandleShowMenu, handleCloseMenu } from "./domHandlers/menuHandler";
import { handleNavBtn, handleNavClose } from "./domHandlers/navTrigger";
import { handleHideModal, handleOpenModal } from "./domHandlers/newProjModal";
import {
  createHandleUpdateFlag,
  createHandleUpdateOverview,
  createHandleUpdateTaskFlag,
  createHandleUpdateTaskOverview,
  createHandleUpdateTaskTitle,
  createHandleUpdateTitle,
  handlePasteAsPlainText,
  handlePreventNewLine,
} from "./domHandlers/updateFields";
import { createHandleSelectProj } from "./domHandlers/viewProject";

type ui = {
  appShell: () => void;
  getCurrProjId: () => string | null;
  selectProject: (id: string) => void;
  getPrevProjId: () => string | null;
  setPrevProjId: (id: string) => string;
  refreshList: () => (listHost: HTMLElement, afterRender: () => void) => void;
};

function buildHandlersRegistry(dispatch: (command: Command) => Result, ui: ui) {
  return {
    click: {
      "create-project": createHandleCreateProj({
        dispatch,
      }),
      "create-task": createHandleCreateTask({
        dispatch,
        getCurrProjId: ui.getCurrProjId,
      }),
      "toggle-flag": createHandleUpdateFlag({
        dispatch,
        getCurrProjId: ui.getCurrProjId,
      }),
      "toggle-task-flag": createHandleUpdateTaskFlag({
        dispatch,
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
      }),
      "update-overview": createHandleUpdateOverview({
        dispatch,
        getCurrProjId: ui.getCurrProjId,
      }),
      "update-task-title": createHandleUpdateTaskTitle({
        dispatch,
      }),
      "update-task-overview": createHandleUpdateTaskOverview({
        dispatch,
      }),
    },
    beforeinput: {
      "prevent-newline": handlePreventNewLine,
    },
    paste: {
      "paste-plain-text": handlePasteAsPlainText,
    },
  };
}

export { buildHandlersRegistry };
