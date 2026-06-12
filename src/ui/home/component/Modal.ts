import type { PageData } from "../../../lib/Page";

function newProject(): PageData {
  return {
    tag: "dialog",
    class: "new-proj-dialog",
    ["data-action"]: "close-modal",
    content: [
      {
        tag: "form",
        class: "newProject",
        content: [
          {
            tag: "fieldset",
            content: [
              { tag: "legend", content: "Add Project" },
              {
                tag: "label",
                for: "projTitle",
                content: "Title",
              },
              { tag: "input", id: "projTitle", type: "text" },
              {
                tag: "label",
                for: "projOverview",
                content: "Overview",
              },
              { tag: "textarea", id: "projOverview" },
              {
                tag: "div",
                class: "formBtns",
                content: [
                  {
                    tag: "button",
                    ["data-action"]: "close-modal",
                    content: "cancel",
                    type: "button",
                    id: "cancelProjBtn",
                  },
                  {
                    tag: "button",
                    ["data-action"]: "create-project",
                    content: "submit",
                    type: "submit",
                    id: "newProjBtn",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

// src/ui/components/Modal.ts (new file)
class ModalManager {
  static open(selector: string) {
    const dialog = document.querySelector(selector) as HTMLDialogElement;
    dialog?.showModal();
  }

  static close(selector: string) {
    const dialog = document.querySelector(selector) as HTMLDialogElement;
    dialog?.close();
  }
}

export { newProject, ModalManager };
