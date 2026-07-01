import { init } from "./bootstrap/init";

import "./ui/styles/app.css";

//initialize app
init();

window.addEventListener("load", () => {
  document.documentElement.classList.add("ready");
});
