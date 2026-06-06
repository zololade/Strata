import type { ProjectInput } from "./Types";

type Command =
  | {
      type: "createProject";
      data: ProjectInput;
    }
  | {
      type: "removeProject";
      projectId: string;
    }
  | {
      type: "removeTask";
      taskId: string;
      projectId: string;
    }
  | {
      type: "removeItem";
      itemId: string;
      taskId: string;
    }
  | {
      type: "update";
    };

export type { Command };
