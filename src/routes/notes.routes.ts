import express from "express";
import { Router } from "express";
const router: Router = express.Router();
import { notes } from "../controllers/index";

router.get("/", notes.fetch.all);
router.get("/:id", notes.fetch.one);
router.post("/create", notes.create);
router.delete("/:id", notes.del);

export default router;
