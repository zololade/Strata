import type { EventBus } from "../../lib/EventBus";
import type { Command, Result } from "../../types/command";

type UpdateProjectDeps = {
  dispatch: (command: Command) => Result;
  getCurrProjId: () => string | null;
  bus: EventBus;
};

function createHandleUpdateTitle({ dispatch, getCurrProjId }: Omit<UpdateProjectDeps, "bus">) {
  return function handleUpdateTitle(match: HTMLElement, _e: Event) {
    const id = getCurrProjId();
    if (!id || !match) return;
    const text = match.textContent.trim().length < 1 ? "New project" : match.textContent;
    const command: Command = {
      type: "updateProject",
      projectId: id,
      data: { title: text },
    };
    dispatch(command);
  };
}

function createHandleUpdateOverview({ dispatch, getCurrProjId }: Omit<UpdateProjectDeps, "bus">) {
  return function handleUpdateOverview(match: HTMLElement, _e: Event) {
    const id = getCurrProjId();
    if (!id || !match) return;
    const command: Command = {
      type: "updateProject",
      projectId: id,
      data: { overview: match.textContent },
    };
    dispatch(command);
  };
}

function createHandleUpdateFlag({ dispatch, getCurrProjId, bus }: UpdateProjectDeps) {
  return function handleUpdateFlag(match: HTMLElement, _e: Event) {
    const id = getCurrProjId();
    if (!id || !match) return;
    const text = match.dataset["flag"];
    if (text) {
      const command: Command = {
        type: "updateProject",
        projectId: id,
        data: {
          flag: text,
          onPersistSuccess: () =>
            bus.publish("flag:toggled", { type: "project", projectId: id, element: match }),
        },
      };
      dispatch(command);
    }
  };
}

type UpdateTaskDeps = {
  dispatch: (command: Command) => Result;
  getCurrProjId: () => string | null;
  bus: EventBus;
};

function createHandleUpdateTaskTitle({ dispatch }: Pick<UpdateTaskDeps, "dispatch">) {
  return function handleUpdateTaskTitle(match: HTMLElement, _e: Event) {
    const taskId = match.dataset["taskId"];
    if (!taskId || !match) return;
    const text = match.textContent?.trim() || "New task";
    const command: Command = {
      type: "updateTask",
      taskId,
      data: { title: text },
    };
    dispatch(command);
  };
}

function createHandleUpdateTaskOverview({ dispatch }: Pick<UpdateTaskDeps, "dispatch">) {
  return function handleUpdateTaskOverview(match: HTMLElement, _e: Event) {
    const taskId = match.dataset["taskId"];
    if (!taskId || !match) return;
    const command: Command = {
      type: "updateTask",
      taskId,
      data: { overview: match.textContent || "" },
    };
    dispatch(command);
  };
}

function createHandleUpdateTaskFlag({ dispatch, getCurrProjId, bus }: UpdateTaskDeps) {
  return function handleUpdateTaskFlag(match: HTMLElement, _e: Event) {
    const id = getCurrProjId();
    const taskId = match.dataset["taskId"];
    const text = match.dataset["flag"];
    if (!taskId || !match || !text || !id) return;

    const command: Command = {
      type: "updateTask",
      taskId,
      data: {
        flag: text,
        onPersistSuccess: () =>
          bus.publish("flag:toggled", { type: "task", projectId: id, element: match }),
      },
    };
    dispatch(command);
  };
}

//misc
function handlePreventNewLine(match: HTMLElement, e: Event) {
  const inputEvent = e as InputEvent;
  if (inputEvent.inputType === "insertParagraph") {
    e.preventDefault();
    match.blur();
  }
}

function handlePasteAsPlainText(_match: HTMLElement, e: Event) {
  const event = e as ClipboardEvent;
  event.preventDefault();

  const text = event.clipboardData?.getData("text/plain") || "";
  if (!text) return;

  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  // 1. Snapshot all active ranges into a clean array first
  const ranges: Range[] = [];
  for (let i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  // 2. Clear out the active layout selection
  selection.removeAllRanges();

  // 3. Loop through every single active range (Perfect for Firefox)
  ranges.forEach((range) => {
    const container = range.commonAncestorContainer as HTMLElement;

    // Find the master parent contenteditable block
    const editableElement =
      (container.closest?.("[contenteditable]") as HTMLElement) ||
      (container.nodeType === Node.ELEMENT_NODE ? container : container.parentElement);

    // 4. Check if the element only contains your placeholder <br> tag
    if (editableElement && editableElement.querySelector("br:only-child")) {
      editableElement.textContent = ""; // Wipe out the break node
      range.selectNodeContents(editableElement); // Target the empty layout space
      range.collapse(true);
    } else {
      // Standard behavior: erase whatever subset of text is highlighted
      range.deleteContents();
    }

    // 5. Create and drop the clean text node string
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);

    // 6. Reset cursor boundary profile
    range.setStartAfter(textNode);
    range.collapse(true);

    // 7. Hand the updated tracking range back to the browser layout engine
    selection.addRange(range);
  });
}

export {
  createHandleUpdateTitle,
  createHandleUpdateOverview,
  createHandleUpdateFlag,
  createHandleUpdateTaskTitle,
  createHandleUpdateTaskOverview,
  createHandleUpdateTaskFlag,
  handlePreventNewLine,
  handlePasteAsPlainText,
};
