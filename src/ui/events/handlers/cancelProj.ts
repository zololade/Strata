function handleCancelProj(_match: HTMLElement, e: Event) {
  let target = e.target as HTMLElement;
  let mainHost = target.closest("#app") as HTMLElement;

  if (mainHost) {
    let dialog = mainHost.querySelector(".new-proj-dialog");
    if (dialog) (dialog as HTMLDialogElement).close();
  }
}

export { handleCancelProj };
