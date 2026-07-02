import type { TaskInstance } from "../../types/Types";
import { TASK_STORE } from "../db";
import { getActions } from "../initialize";

const taskActions = getActions<TaskInstance>(TASK_STORE);
export { taskActions };
