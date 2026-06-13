import { ModalManager } from "../../views/component/Modal";

//open modal
function handleOpenModal(_match: HTMLElement, _e: Event) {
  ModalManager.open(".new-proj-dialog");
}

//close modal
function handleHideModal(_match: HTMLElement, e: Event) {
  let target = e.target as HTMLElement | null;

  if (target instanceof HTMLDialogElement) {
    ModalManager.close(".new-proj-dialog");
  } else if (target && target.id === "cancelProjBtn") {
    ModalManager.close(".new-proj-dialog");
  } else return;
}

export { handleHideModal, handleOpenModal };
