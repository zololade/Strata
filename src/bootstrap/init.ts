// domHandlers factories
import { buildHandlersRegistry } from "../handlers/registry";
import { createPersistence } from "../persistence";
import { createSnapshot, buildStoreSelectors, createDispatch, createReducer } from "../store";
// bootstrap/init.ts
import { initializeEvents, type HandlersByEvent } from "../ui/eventDelegation";
import { createTaskReactions } from "../ui/reactions/taskReaction";
import { createAppShell } from "../ui/views/home";
import { initializeServices, appBus } from "./initializers/eventInit";

async function init() {
  try {
    const persistence = createPersistence();
    const { projectActions, taskActions, itemActions, enqueuePersist, rehydrate } = persistence;
    const { store, bind } = createSnapshot(rehydrate);
    const selectors = buildStoreSelectors(store);
    const loadState = {
      projects: await projectActions.getAll(),
      tasks: await taskActions.getAll(),
      items: await itemActions.getAll(),
    };
    const ui = createAppShell(selectors, appBus);
    const reducer = createReducer(enqueuePersist, appBus);
    const dispatch = createDispatch(store, reducer);
    const taskReactions = createTaskReactions({
      selectors,
      getCurrProjId: ui.getCurrProjId,
    });
    const handlers: HandlersByEvent = buildHandlersRegistry(dispatch, ui, appBus);

    bind(loadState);
    initializeServices(selectors, ui, taskReactions);
    ui.appShell();
    initializeEvents(handlers);
  } catch (error) {
    console.error("App initialization failed:", error);
    document.querySelector("#app")!.textContent = "Oops! Something went wrong loading the app.";
  }
}

export { init };
