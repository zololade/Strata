import type { ItemInput, ProjectInput, TaskInput } from "./Types";

type Command =
  | {
      type: "createProject";
      data: ProjectInput;
    }
  | {
      type: "createTask";
      projectId: string;
      data: TaskInput;
    }
  | {
      type: "createItem";
      taskId: string;
      data: ItemInput;
    }
  | {
      type: "removeProject";
      data: {
        projectId: string;
      };
    }
  | {
      type: "removeTask";
      data: {
        taskId: string;
        projectId: string;
      };
    }
  | {
      type: "removeItem";
      data: {
        itemId: string;
        taskId: string;
      };
    }
  | {
      type: "update";
    };

export type { Command };
