type IdMap = "projectId" | "taskId" | "itemId";
type IdType = {
  [key in IdMap]?: string;
};

type Command =
  | ({
      action: "remove";
      type: "removeProject" | "removeTask" | "removeItem";
    } & IdType)
  | {
      action: "update";
    };

export type { Command };
