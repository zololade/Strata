function createUpdateReaction(
  refreshList: () => (listHost: HTMLElement, afterRender: () => void) => void,
  selectProject: (id: string) => void,
) {
  return function handleProjectCreated(data: unknown) {
    const id = data as string | null;
    const listHost = document.querySelector(".mainNav__list") as HTMLUListElement | null;
    const afterRender = refreshList();
    if (listHost && id) afterRender(listHost, () => selectProject(id));
  };
}

export { createUpdateReaction };
