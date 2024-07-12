// route.ts
import { Router } from "express";
import { chatfn } from "../controller/ai.controller";

const router = Router();

router.get("/chat/:userId", chatfn);

export default router;
