import type { ItemInstance } from "../../types/Types";
import { ITEM_STORE } from "../db";
import { getActions } from "../initialize";

const itemActions = getActions<ItemInstance>(ITEM_STORE);
export { itemActions };
