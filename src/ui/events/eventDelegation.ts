// import { handleCreateProj } from "./handlers/createNewProj";
import { handleHideModal, handleOpenModal } from "./handlers/newProjModal";
import { handleSelectProj } from "./handlers/viewProject";

let main = document.querySelector("#app") as HTMLElement;

function initializeEvents() {
  const actionHandlers = {
    // "create-project": handleCreateProj,
    "open-modal": handleOpenModal,
    "close-modal": handleHideModal,
    "select-project": handleSelectProj,
  };

  main.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    const el = target.closest("[data-action]") as HTMLElement | null;

    if (!el) return;
    const action = el.dataset["action"];
    const handler = actionHandlers[action as keyof typeof actionHandlers];
    if (handler) handler(el, e);
  });
}

export { initializeEvents };
