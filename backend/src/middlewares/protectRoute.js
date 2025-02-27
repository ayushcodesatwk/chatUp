import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, please login",
      });
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Not authorized, Invalid token",
      });
    }

    // console.log("decoded from middleware--", decoded);

    // finds the user without password
    const user = await User.findById(decoded.id).select("-password");

    console.log("user from middleware--", user);

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
