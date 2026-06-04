interface ProjectData {
  id: string;
  title: string;
  overview: string;
  flag: null | string[];
  tasks: TaskData[];
  createdAt: number;
  lastModified: number;
}

interface TaskData {
  id: string;
  title: string;
  overview: string;
  flag: null | string[];
  items: ItemData[];
}

interface ItemData {
  id: string;
  content: string;
  note?: string;
  flag: null | string[];
}

export type { ProjectData, TaskData, ItemData };
