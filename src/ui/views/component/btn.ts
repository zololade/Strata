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
  sideNav: "side_navigation",
  more: "more_horiz",
  edit: "edit_square",
  favorite: "favorite",
  add: "add_2",
  close: "close",
  important: "priority_high",
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

const iconEmojiMap: Record<string, string> = {
  favorite: "⭐",
  priority_high: "🚩",
};

function button({ cls, label, action, type, flag, id, context }: incoming): PageData {
  const iconName = btnTypes[type];
  const isMaterialIcon = materialTypes.includes(iconName);

  // Build the content array for the button
  let content: PageData[] = [];

  if (isMaterialIcon) {
    content.push(
      {
        tag: "span",
        class: "material-symbols-outlined",
        content: iconName,
      },
      {
        tag: "span",
        class: "emoji-icon",
        content: iconEmojiMap[iconName] || "",
      },
    );
  } else {
    content.push({ tag: "span", content: iconName });
  }

  // If context is true, add the label
  if (context) {
    content.push({ tag: "span", class: "btn__label", content: type });
  }

  return {
    tag: "button",
    class: cls,
    ["aria-label"]: label,
    ["data-action"]: action,
    content: content,
    ...(flag !== undefined && flag !== null && { "data-flag": flag }),
    ...(id !== undefined && id !== null && { [`data-${id[0]}`]: id[1] }),
  };
}

export { button };
