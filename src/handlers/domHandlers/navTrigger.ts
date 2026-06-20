// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleNavBtn(_match: Element, _e: Event) {
  const app = document.querySelector("#app");
  if (app) (app as HTMLElement).classList.add("is_open");
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleNavClose(_match: Element, _e: Event) {
  const app = document.querySelector("#app");
  if (app) (app as HTMLElement).classList.remove("is_open");
}

export { handleNavBtn, handleNavClose };
