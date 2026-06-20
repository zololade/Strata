import { init } from "./bootstrap/init";
import "./ui/styles/app.css";

//initialize app
init();

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});
