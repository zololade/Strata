import "./services/init";
import "./store/Store";
import "./data/index";
import "./ui/styles/app.css";
import "./ui/events/eventDelegation";

//declare the app
let app = document.querySelector("#app");

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

export { app };
