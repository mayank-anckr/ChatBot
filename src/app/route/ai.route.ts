// route.ts
import { Router } from "express";
import { chatfn } from "../controller/ai.controller";

const router = Router();

router.post("/chat", chatfn);

export default router;
