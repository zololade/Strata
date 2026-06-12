import { initializeServices } from "./services/init";
import { initializeDatabase } from "./data/index";
import { initializeEvents } from "./ui/events/eventDelegation";
import "./ui/styles/app.css";
//declare the app/
let main = document.querySelector("#app") as HTMLElement;

//initialize app
initializeServices();
initializeDatabase();
initializeEvents();

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

export { main };
