import { initializeServices } from "./bootstrap/initializers/eventInit";
import { initializeDatabase } from "./bootstrap/initializers/databaseInit";
import { initializeEvents } from "./ui/eventDelegation";
import "./ui/styles/app.css";

//initialize app
initializeServices();
initializeDatabase();
initializeEvents();

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});
