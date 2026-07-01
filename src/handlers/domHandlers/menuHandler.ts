function createHandleShowMenu(showMenu: (el: HTMLElement) => void) {
  return function handleShowMenu(match: HTMLElement, _e: Event) {
    let parent = match.parentElement as HTMLElement;
    let element = parent.querySelector(".hidden") as HTMLElement | null;
    if (element) showMenu(element);
  };
}

function handleCloseMenu(_match: HTMLElement, _e: Event) {
  let menus = document.querySelectorAll(".hidden");
  menus.forEach((el) => ((el as HTMLElement).style.display = "none"));
}

export { createHandleShowMenu, handleCloseMenu };
