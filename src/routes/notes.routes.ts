import notes from "../controllers/notes";
import express from "express";
import { Router } from "express";
const router: Router = express.Router();

router.post("/create", notes.create);

export default router;
