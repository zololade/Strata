// ui/reactions/titleReaction.ts
function createTitleReaction() {
  function updateToolbarTitle(title: string) {
    const el = document.querySelector("#projDetailTitle") as HTMLElement | null;
    if (el) el.textContent = title;
  }

  function updateSidebarTitle(id: string, title: string) {
    const el = document.querySelector(
      `[data-id="${id}"] h3`,
    ) as HTMLElement | null;
    if (el) el.textContent = title;
  }

  function handleTitleUpdated(data: unknown) {
    const { id, title } = data as { id: string; title: string };
    updateToolbarTitle(title);
    updateSidebarTitle(id, title);
  }

  return { handleTitleUpdated };
}

export { createTitleReaction };
