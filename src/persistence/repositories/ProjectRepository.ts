import type { ProjectInstance } from "../../types/Types";
import { PROJECT_STORE } from "../db";
import { getActions } from "../initialize";

const projectActions = getActions<ProjectInstance>(PROJECT_STORE);
export { projectActions };
