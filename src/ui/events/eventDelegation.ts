import { handleCreateProj } from "./handlers/createNewProj";
import { handleHideModal, handleOpenModal } from "./handlers/newProjModal";

let main = document.querySelector("#app") as HTMLElement;

function initializeEvents() {
  const actionHandlers = {
    "create-project": handleCreateProj,
    "open-modal": handleOpenModal,
    "close-modal": handleHideModal,
  };

  main.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    const el = target.closest("[data-action]") as HTMLElement;

    if (!el) return;
    const action = el.dataset["action"];
    const handler = actionHandlers[action as keyof typeof actionHandlers];
    if (handler) handler(target, e);
  });
}

export { initializeEvents };
