import type { EventBus } from "../../lib/EventBus";
import type { Command, Result } from "../../types/command";

type DeleteProjDeps = {
  dispatch: (command: Command) => Result;
  getCurrProjId: () => string | null;
  bus: EventBus;
};

function createHandleDelete({ dispatch, getCurrProjId, bus }: DeleteProjDeps) {
  function handleDeleteProj(_match: HTMLElement, _e: Event) {
    const id = getCurrProjId();
    if (id) {
      const command: Command = {
        type: "removeProject",
        data: {
          projectId: id,
          onPersistSuccess: () => {
            bus.publish("delete:project", null);
          },
        },
      };

      dispatch(command);
    }
  }

  function handleDeleteTask(match: HTMLElement, _e: Event) {
    const id = match.dataset["taskId"];

    if (id) {
      const command: Command = {
        type: "removeTask",
        data: {
          taskId: id,
          onPersistSuccess: () => {
            bus.publish("delete:task");
          },
        },
      };
      dispatch(command);
    }
  }
  return { handleDeleteProj, handleDeleteTask };
}

export { createHandleDelete };
