import { ModalManager } from "../../views/component/Modal";

//open modal
function handleOpenModal(_match: HTMLElement, _e: Event) {
  ModalManager.open(".dialog");
}

//close modal
function handleHideModal(_match: HTMLElement, e: Event) {
  let target = e.target as HTMLElement | null;

  if (target instanceof HTMLDialogElement) {
    ModalManager.close(".dialog");
  } else if (target && target.id === "cancelProjBtn") {
    ModalManager.close(".dialog");
  } else return;
}

export { handleHideModal, handleOpenModal };
