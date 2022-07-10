import create from "./create.controller";
import fetch from "./fetch.controller";
import del from "./delete.controller";
import update from "./update.controller";

// TODO: ADD UPDATE ROUTE

const notes = {
  create,
  update,
  fetch,
  del,
};

export default notes;
