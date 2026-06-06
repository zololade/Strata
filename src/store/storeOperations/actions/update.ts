import { databaseBus } from "../../../lib/Buses";
import type { Command } from "../../../lib/command";
import type { StoredType } from "../../../lib/Types";

// handler
function update(store: StoredType, _payLoad: Command) {
  databaseBus.publish("database:update", store);
}

export { update };
