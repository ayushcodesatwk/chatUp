import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import generateToken from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// creating a new user
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    //verifying password
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password should be at least 6 characters long",
      });
    }

    const user = await User.find({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = bcrypt.genSalt(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    // hash password
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      token: generateToken(newUser._id),
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
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
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
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: 0,
    });
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
