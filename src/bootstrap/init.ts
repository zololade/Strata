// domHandlers factories
import { buildHandlersRegistry } from "../handlers/registry";
import { createPersistence } from "../persistence";
import { createDispatch } from "../store/dispatch";
// bootstrap/init.ts
import { createSnapshot } from "../store/Store";
import { initializeEvents, type HandlersByEvent } from "../ui/eventDelegation";
import { createTaskReactions } from "../ui/reactions/taskReaction";
import { createAppShell } from "../ui/views/home";
import { initializeServices, appBus } from "./initializers/eventInit";

async function init() {
  try {
    const persistence = createPersistence();
    const { projectActions, taskActions, itemActions, rehydrate } = persistence;
    const { store, bind } = createSnapshot(rehydrate);
    const loadState = {
      projects: await projectActions.getAll(),
      tasks: await taskActions.getAll(),
      items: await itemActions.getAll(),
    };
    const dispatch = createDispatch(store);
    const ui = createAppShell(store, appBus);
    const taskReactions = createTaskReactions({
      store,
      getCurrProjId: ui.getCurrProjId,
    });
    const handlers: HandlersByEvent = buildHandlersRegistry(dispatch, ui, appBus);

    bind(loadState);
    initializeServices(store, ui, taskReactions);
    ui.appShell();
    initializeEvents(handlers);
  } catch (error) {
    console.error("App initialization failed:", error);
    document.querySelector("#app")!.textContent = "Oops! Something went wrong loading the app.";
  }
}

export { init };
