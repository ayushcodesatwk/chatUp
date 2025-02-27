import { Router } from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";


const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);

//to update the profile
authRoutes.put("/update-profile", protectRoute, updateProfile);
//to check the auth on every reload
authRoutes.get("/check", protectRoute, checkAuth);

export default authRoutes;
