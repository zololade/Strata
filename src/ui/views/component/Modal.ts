import type { PageData } from "../../../lib/Page";

function newProject(): PageData {
  return {
    tag: "dialog",
    class: "dialog",
    ["data-action"]: "close-modal",
    content: [
      {
        tag: "form",
        class: "dialog__form",
        content: [
          {
            tag: "fieldset",
            content: [
              { tag: "legend", content: "New project" },
              {
                tag: "label",
                class: "accessible",
                for: "projTitle",
                content: "Title",
              },
              {
                tag: "input",
                id: "projTitle",
                type: "text",
                placeholder: "Project name",
              },
              {
                tag: "label",
                class: "accessible",
                for: "projOverview",
                content: "Overview",
              },
              {
                tag: "textarea",
                id: "projOverview",
                placeholder: "Add a short summary...",
              },
              {
                tag: "div",
                class: "form__buttons",
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
