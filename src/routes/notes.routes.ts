import notes from "../controllers/notes";
import express from "express";
import { Router } from "express";
const router: Router = express.Router();

router.get("/", notes.fetch.all);
router.post("/create", notes.create);
router.get("/:id", notes.fetch.one);

export default router;
