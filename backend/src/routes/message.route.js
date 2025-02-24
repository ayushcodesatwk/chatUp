import { Router } from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { getMessages, getUsersForSidebar } from "../controllers/message.controller.js";


const router = Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);


export default router;