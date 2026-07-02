import { init } from "./bootstrap/init";
import { get } from "./persistence/repositories/ProjectRepository";

import "./ui/styles/app.css";

//initialize app
init();

(async function () {
  const result = await get("proj-1");
  console.log(result);
})();

window.addEventListener("load", () => {
  document.documentElement.classList.add("ready");
});
