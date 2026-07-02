function createHandleProjectSelection(showActiveProject: (data: unknown) => void) {
  return function handleProjectSelection(data: unknown) {
    showActiveProject(data);
  };
}

export { createHandleProjectSelection };
