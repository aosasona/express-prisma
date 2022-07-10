const router = require("express").Router();
import authMiddleware from "../middleware/auth.middleware";
import { default as auth } from "./auth.routes";
import { default as notes } from "./notes.routes";

router.use("/auth", auth);
router.use("/notes", authMiddleware, notes);

export default router;
