import "./app/init";
import "./core/state/Maps";
import "./database/index";
import "./styles/app.css";
import "./core/events/eventDelegation";

//declare the app
let app = document.querySelector("#app");

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

export { app };
