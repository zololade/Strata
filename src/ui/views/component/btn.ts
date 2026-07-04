import type { PageData } from "../../../lib/Page";

type incoming = {
  cls: string;
  label: string;
  action: string;
  type: keyof typeof btnTypes;
  context?: boolean;
  flag?: string;
  id?: [string, string];
};

const btnTypes = {
  SideNav: "side_navigation",
  More: "more_horiz",
  Edit: "edit_square",
  Favorite: "favorite",
  Add: "add_2",
  Close: "close",
  Important: "priority_high",
};

const materialTypes = [
  "side_navigation",
  "more_horiz",
  "edit_square",
  "favorite",
  "add_2",
  "close",
  "priority_high",
];

function button({ cls, label, action, type, flag, id, context }: incoming): PageData {
  const iconName = btnTypes[type];
  const isMaterialIcon = materialTypes.includes(iconName);

  const iconContent =
    isMaterialIcon && !context
      ? {
          tag: "span",
          class: "material-symbols-outlined",
          content: iconName,
        }
      : context && isMaterialIcon
        ? [
            {
              tag: "span",
              class: "material-symbols-outlined",
              content: iconName,
            },
            {
              tag: "span",
              content: type,
            },
          ]
        : {
            tag: "span",
            content: iconName,
          };

  return {
    tag: "button",
    class: cls,
    ["aria-label"]: label,
    ["data-action"]: action,
    content: [iconContent],
    ...(flag !== undefined && flag !== null && { "data-flag": flag }),
    ...(id !== undefined && id !== null && { [`data-${id[0]}`]: id[1] }),
  };
}

export { button };
