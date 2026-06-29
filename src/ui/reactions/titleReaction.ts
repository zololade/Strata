// ui/reactions/titleReaction.ts
function createTitleReaction() {
  // oxlint-disable-next-line unicorn/consistent-function-scoping -- factory runs once at composition root
  function updateToolbarTitle(title: string) {
    const el = document.querySelector("#projDetailTitle") as HTMLElement | null;
    if (el) el.textContent = title;
  }

  // oxlint-disable-next-line unicorn/consistent-function-scoping -- factory runs once at composition root
  function updateSidebarTitle(id: string, title: string) {
    const el = document.querySelector(`[data-id="${id}"] h3`) as HTMLElement | null;
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
