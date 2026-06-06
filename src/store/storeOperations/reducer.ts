import type { StoredType } from "../../lib/Types";
import type { Command } from "../../lib/command";
import { remove } from "./actions/remove";
import { update } from "./actions/update";

function reducer(command: Command, store: StoredType) {
  switch (command.action) {
    case "remove":
      remove(store, command);
      break;

    case "update":
      update(store, command);
      break;
  }
}

export { reducer };
