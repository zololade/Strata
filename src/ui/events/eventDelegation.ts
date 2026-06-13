import { handleCreateProj } from "./handlers/createNewProj";
import { handleHideModal, handleOpenModal } from "./handlers/newProjModal";
import { handleSelectProj } from "./handlers/viewProject";

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
      const eventType = actionHandlers.get(k);
      if (eventType) {
        const handler = eventType[action as keyof typeof eventType];
        if (handler) handler(el, e);
      }
    }),
  );
}

export { initializeEvents };
