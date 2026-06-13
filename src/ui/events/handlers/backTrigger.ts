function handleBackBtn(_match: Element, _e: Event) {
  const app = document.querySelector("#app");

  if (app) (app as HTMLElement).classList.remove("project-selected");
}

export { handleBackBtn };
