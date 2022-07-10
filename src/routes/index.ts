const router = require("express").Router();
import { default as auth } from "./auth.route";

router.use("/auth", auth);

export default router;
