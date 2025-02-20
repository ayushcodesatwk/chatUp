import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }, 
        receieverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        }
}, {
    timestamps: true,
})

const Message = mongoose.model("Message", messageModel);

export default Message;
