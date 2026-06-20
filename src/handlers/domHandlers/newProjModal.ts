import { ModalManager } from "../../ui/views/component/Modal";

//open modal
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleOpenModal(_match: HTMLElement, _e: Event) {
  ModalManager.open(".dialog");
}

//close modal

function handleHideModal(_match: HTMLElement, e: Event) {
  const target = e.target as HTMLElement | null;

  if (target instanceof HTMLDialogElement) {
    ModalManager.close(".dialog");
  } else if (target && target.id === "cancelProjBtn") {
    ModalManager.close(".dialog");
  } else return;
}

export { handleHideModal, handleOpenModal };
