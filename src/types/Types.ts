type EntityMeta = {
  id: string;
  createdAt: number;
  lastModified: number;
};

interface NewProjectInput {
  title: string;
  overview: string;
  flag: null | string[];
}

interface NewTaskInput {
  title: string;
  overview: string;
  flag: null | string[];
  projectId: string;
}

interface NewItemInput {
  content: string;
  note: string;
  flag: null | string[];
  taskId: string;
}

//app instance
interface ProjectInstance extends EntityMeta {
  title: string;
  overview: string;
  flag: string[] | null;
}

interface TaskInstance extends EntityMeta {
  title: string;
  overview: string;
  flag: string[] | null;
  projectId: string;
}

interface ItemInstance extends EntityMeta {
  content: string;
  note: string;
  flag: string[] | null;
  taskId: string;
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
  onPersistSuccess?: () => void;
}

interface TaskUpdate {
  title?: string;
  overview?: string;
  flag?: string;
  onPersistSuccess?: () => void;
}

interface ItemUpdate {
  content?: string;
  note?: string;
  flag?: string;
  onPersistSuccess?: () => void;
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
  ProjectInstance,
  TaskInstance,
  ItemInstance,
  DBCollection,
  ProjectUpdate,
  TaskUpdate,
  ItemUpdate,
  PersistOperation,
};
