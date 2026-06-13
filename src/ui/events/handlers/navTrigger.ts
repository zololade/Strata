function handleNavBtn(_match: Element, _e: Event) {
  const app = document.querySelector("#app");
  if (app) (app as HTMLElement).classList.add("is_open");
}
function handleNavClose(_match: Element, _e: Event) {
  const app = document.querySelector("#app");
  if (app) (app as HTMLElement).classList.remove("is_open");
}

export { handleNavBtn, handleNavClose };
