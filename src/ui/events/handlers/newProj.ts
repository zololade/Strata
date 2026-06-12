function handleNewProjBtn(_match: HTMLElement, e: Event) {
  let target = e.target as HTMLElement | null;

  if (target) {
    let main = target.closest("#app") as HTMLElement;
    let dialog = main.querySelector("dialog");

    if (dialog) {
      (dialog as HTMLDialogElement).showModal();
    }
  }
}

export { handleNewProjBtn };
