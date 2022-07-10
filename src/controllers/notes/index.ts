import create from "./create.controller";
import fetch from "./fetch.controller";
import del from "./delete.controller";

// TODO: ADD UPDATE ROUTE

const notes = {
  create,
  fetch,
  del,
};

export default notes;
