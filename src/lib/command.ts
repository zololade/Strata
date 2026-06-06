type Command =
  | {
      action: "remove";
      type: "removeProject";
      projectId: string;
    }
  | {
      action: "remove";
      type: "removeTask";
      taskId: string;
      projectId: string;
    }
  | {
      action: "remove";
      type: "removeItem";
      itemId: string;
      taskId: string;
    }
  | {
      action: "update";
    };

export type { Command };
