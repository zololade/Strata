import { databaseBus } from "../../../lib/Buses";
import type { StoredType } from "../../../lib/Types";

// handler
function update(store: StoredType) {
  databaseBus.publish("database:update", store);
}

export { update };
