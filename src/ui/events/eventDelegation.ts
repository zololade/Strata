import { handleNavBtn, handleNavClose } from "./handlers/navTrigger";
import { handleCreateProj } from "./handlers/createNewProj";
import { handleHideModal, handleOpenModal } from "./handlers/newProjModal";
import { handleSelectProj } from "./handlers/viewProject";
import {
  handlePreventNewLine,
  handleUpdateOverview,
  handleUpdateTitle,
  handlePasteAsPlainText,
} from "./handlers/updateFields";

let main = document.querySelector("#app") as HTMLElement;

function initializeEvents() {
  const actionHandlers = new Map([
    [
      "click",
      {
        "create-project": handleCreateProj,
        "open-modal": handleOpenModal,
        "close-modal": handleHideModal,
        "select-project": handleSelectProj,
        "show-nav": handleNavBtn,
        "close-nav": handleNavClose,
      },
    ],
    [
      "focusout",
      {
        "update-title": handleUpdateTitle,
        "update-overview": handleUpdateOverview,
      },
    ],
    [
      "keydown",
      {
        "prevent-newline": handlePreventNewLine,
      },
    ],
    [
      "paste",
      {
        "paste-plain-text": handlePasteAsPlainText,
      },
    ],
  ]);

  actionHandlers.forEach((_v, k) =>
    main.addEventListener(k, (e) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const el = target.closest("[data-action]") as HTMLElement | null;

      if (!el) return;
      const action = el.dataset["action"];
      const actions = action?.split(" ") ?? [];
      const eventType = actionHandlers.get(k);
      if (eventType) {
        actions.forEach((a) => {
          const handler = eventType[a as keyof typeof eventType];
          if (handler) handler(el, e);
        });
      }
    }),
  );
}

export { initializeEvents };
