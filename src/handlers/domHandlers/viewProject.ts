function createHandleSelectProj(selectProject: (id: string) => void) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function handleSelectProj(match: HTMLElement, _e: Event) {
    const btn = match.dataset["id"];
    if (btn) {
      selectProject(btn);
    }
  };
}

export { createHandleSelectProj };
