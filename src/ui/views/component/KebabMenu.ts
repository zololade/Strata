import type { PageData } from "../../../lib/Page";
import { button } from "./btn";

type MenuOption = {
  label: string;
  action: string;
  danger?: boolean;
};

type KebabMenuProps = {
  id?: string; // projectId or taskId
  type: "project" | "task";
  options: MenuOption[];
};

function kebabMenuContent({ id, type, options }: KebabMenuProps): PageData[] {
  return [
    button({
      cls: type === "project" ? "toolbar__menu" : "task__menu",
      label: "Options",
      action: "toggle-kebab",
      type: "more",
      ...(id !== undefined &&
        id !== null && {
          id: [type === "project" ? "project-id" : "task-id", id],
        }),
    }),
    {
      tag: "div",
      class: "kebab-dropdown hidden",
      content: options.map((opt) => ({
        tag: "button",
        class: opt.danger ? "danger" : "",
        ["data-action"]: opt.action,
        ...(id && { [`data-${type}-id`]: id }),
        content: opt.label,
      })),
    },
  ];
}

export { kebabMenuContent, type MenuOption };
