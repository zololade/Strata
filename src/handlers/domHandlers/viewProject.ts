function createHandleSelectProj(selectProject: (id: string) => void) {
  return function handleSelectProj(match: HTMLElement, _e: Event) {
    const btn = match.dataset["id"];
    if (btn) {
      selectProject(btn);
    }
  };
}

export { createHandleSelectProj };
