import { ModalManager } from "../../home/component/Modal";

//open modal
function handleOpenModal(_match: HTMLElement, _e: Event) {
  ModalManager.open(".new-proj-dialog");
}

//close modal
function handleHideModal(match: HTMLElement, _e: Event) {
  if (match instanceof HTMLDialogElement) {
    ModalManager.close(".new-proj-dialog");
  } else if (match.id === "cancelProjBtn") {
    ModalManager.close(".new-proj-dialog");
  } else return;
}

export { handleHideModal, handleOpenModal };
