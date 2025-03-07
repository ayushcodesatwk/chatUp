import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceieverSocketId, io } from "../lib/socket.js";
  
export const getUsersForSidebar = async (req, res) => {
    
    const loggedInUserId = req.user._id;

    try {
        // here we are fetching all users which are not equal to the current users id exept password
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password");

        console.log("filteredUsers-- ", filteredUsers)
        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("error getting users--", error)
      res.status(500).json({
        message: "Internal server error",       
      });
    }
  };

export const getMessages = async (req, res) => {

    try {
        //renaming the id to userToChatId to make it more readable
        const { id: userToChatId } = req.params;
    
        const senderId = req.user._id;
    
        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: senderId },
            ],
        })

        res.status(200).json(messages);
        
    } catch (error) {
        console.log("error getting messages--", error)
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
          });
    }


}

export const sendMessage = async ( req, res) => {
        try {
            
            const { text, image } = req.body;
            const {id: receiverId} = req.params;

            const senderId = req.user._id;

            let imageUrl;

            if(image){
                // upload base64 image to cloudinary
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            }

            const message = await Message.create({
                senderId,
                receiverId,
                text,
                image: imageUrl,
            });

            await message.save();

            // realtime functionality from here-- socket.io
            const receiverSocketId = getReceieverSocketId(receiverId);

            // if user is online
            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessage", message);;
            };
        
            res.status(200).json(message);

        } catch (error) {

            console.log("error sending message--", error);

            res.status(500).json({
                message: "Internal server error sending message",
                error: error.message,
              });
        }
};
