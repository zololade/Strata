import type { PageData } from "../../../lib/Page";

type incoming = {
  cls: string;
  label: string;
  action: string;
  type: keyof typeof btnTypes;
  flag?: string;
  id?: [string, string];
};

const btnTypes = {
  sideNav: "side_navigation",
  more: "more_horiz",
  edit: "edit_square",
  favor: "favorite",
  add: "add_2",
  close: "close",
};

function button({ cls, label, action, type, flag, id }: incoming): PageData {
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
    ...(flag !== undefined && flag !== null && { "data-flag": flag }),
    ...(id !== undefined && id !== null && { [`data-${id[0]}`]: id[1] }),
  };
}

export { button };
