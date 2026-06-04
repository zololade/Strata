import "./core/Maps";
import "./database/index";
import "./styles/app.css";
import "./core/eventDelegation";

//declare the app
let app = document.querySelector("#app");

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

export { app };
