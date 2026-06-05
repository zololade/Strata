type Command =
  | { type: "removeTask"; projectId: string; taskId: string }
  | { type: "addTask"; projectId: string; taskId: string }
  | { type: "editProject"; projectId: string; title: string };

export type { Command };
