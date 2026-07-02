type EntityMeta = {
  id: string;
  createdAt: number;
  lastModified: number;
};

interface NewProjectInput {
  title: string;
  overview: string;
  flag: null | string[];
  tasks: string[];
}

interface NewTaskInput {
  title: string;
  overview: string;
  flag: null | string[];
  items: string[];
}

interface NewItemInput {
  content: string;
  note: string;
  flag: null | string[];
}

type ProjectInput = EntityMeta & {
  title: string;
  overview: string;
  flag: null | string[];
  tasks: string[];
};

type TaskInput = EntityMeta & {
  title: string;
  overview: string;
  flag: null | string[];
  items: string[];
};

type ItemInput = EntityMeta & {
  content: string;
  note: string;
  flag: null | string[];
};

interface Snapshot {
  // version: number;
  projects: ProjectInput[];
  tasks: TaskInput[];
  items: ItemInput[];
}

//app instance
interface ProjectInstance extends EntityMeta {
  title: string;
  overview: string;
  flag: string[] | null;
  tasks: Set<string>;
}

interface TaskInstance extends EntityMeta {
  title: string;
  overview: string;
  flag: string[] | null;
  items: Set<string>;
}

interface ItemInstance extends EntityMeta {
  content: string;
  note: string;
  flag: string[] | null;
}

interface DBCollection {
  projects: ProjectInstance[];
  tasks: TaskInstance[];
  items: ItemInstance[];
}

type StoredType = {
  projects: Map<string, ProjectInstance>;
  tasks: Map<string, TaskInstance>;
  items: Map<string, ItemInstance>;
};

// update
interface ProjectUpdate {
  title?: string;
  overview?: string;
  flag?: string;
}

interface TaskUpdate {
  title?: string;
  overview?: string;
  flag?: string;
}

interface ItemUpdate {
  content?: string;
  note?: string;
  flag?: string;
}

type PersistOperation =
  | { store: "projects"; action: "put"; payload: ProjectInstance; onSuccess?: () => void }
  | { store: "tasks"; action: "put"; payload: TaskInstance; onSuccess?: () => void }
  | { store: "items"; action: "put"; payload: ItemInstance; onSuccess?: () => void }
  | { store: "projects"; action: "delete"; id: string; onSuccess?: () => void }
  | { store: "tasks"; action: "delete"; id: string; onSuccess?: () => void }
  | { store: "items"; action: "delete"; id: string; onSuccess?: () => void };

export type {
  NewProjectInput,
  NewTaskInput,
  NewItemInput,
  StoredType,
  ProjectInput,
  TaskInput,
  ItemInput,
  Snapshot,
  ProjectInstance,
  TaskInstance,
  ItemInstance,
  DBCollection,
  ProjectUpdate,
  TaskUpdate,
  ItemUpdate,
  PersistOperation,
};
