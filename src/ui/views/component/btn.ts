import type { PageData } from "../../../lib/Page";

const btnTypes = {
  sideNav: "side_navigation",
  more: "more_horiz",
  edit: "edit_square",
  favor: "favorite",
};

function button(
  cls: string,
  label: string,
  action: string,
  type: keyof typeof btnTypes,
): PageData {
  return {
    tag: "button",
    class: cls,
    ["aria-label"]: label,
    ["data-action"]: action,
    content: [
      {
        tag: "span",
        class: "material-symbols-outlined",
        content: btnTypes[type],
      },
    ],
  };
}

export { button };
