import express from "express";
import { createAccount } from "../controllers/create-account.js";
import { createSession } from "../controllers/create-session.js";

const router = express.Router();

router.post("/account", createAccount);
router.post("/session", createSession);

export default router;
