function hideModalHandler(match: HTMLElement, e: Event) {
  if (e.target === match) (match as HTMLDialogElement).close();
}

export { hideModalHandler };
