import express, { Router } from "express";
const router: Router = express.Router();

//  Import Controller
import { auth } from "../controllers";

router.post("/create", auth.create);

export default router;
