import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// creating a new user
export const signup = async (req, res) => {
  // console.log("body object-- ", req.body);
  
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      console.log("not a valid entry");

      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    //verifying password
    if (password.length < 6) {
      console.log("not valid pass");

      return res.status(400).json({
        message: "Password should be at least 6 characters long",
      });
    }

    //check if user already exists
    const user = await User.findOne({ email }).exec();

    if (user) {
      console.log("user already present");

      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =  await bcrypt.hash(password, salt);

    // create new user
    const newUser = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic || "",
      token: token,
    });
  } catch (error) {
    console.log(" Error creating user-- ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// login user
export const login = async (req, res) => {

  console.log("request body from login cont. function--",req.body)
  
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    //compare the password with the user.password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("invalid credentials");
      
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    console.log("token-- ",token);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("login error-", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    //simply clear the cookie
    const cookieCleared = res.clearCookie("jwt");
    console.log("cookieCleared--",cookieCleared);
    
    res.status(200).json({
      message: "User logged out successfully",
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error: failed to logout",
    });
  }
};

// update profile pic
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({
        message: "Please upload a profile picture",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    //FOR MORE ORGANISED UPLOAD
    // const uploadResponse = await cloudinary.uploader.upload(profilePic, {
    //     upload_preset: "chatApp",
    //     folder: "profilePics",
    //  })

    //hover over new to know more about it
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error updating profile-", error);
    res.status(500).json({
      message: ("error uploading image", error.message),
    });
  }
};

// check authentication
export const checkAuth = async (req, res) => {
  try {

    res.status(200).json(req.user);
  } catch (error) {
    console.log(" Error checking authentication", error.message);
  }
};
