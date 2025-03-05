import React, { useRef, useState } from "react";
import { X, Image, Send } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { sendMessage } = useChatStore();
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if(!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };


  const removeImage = () => {
    setImagePreview(null);
    
    if(fileInputRef.current){
      fileInputRef.current.value = null;
    }

  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if(!text.trim() && !imagePreview) return;

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });

      // clearing form
      setText("");
      setImagePreview(null);

      if(fileInputRef.current) fileInputRef.current.value = null;

    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <>
      <div className="p-4 w-full">
        {/* to show the image preview */}
        {imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          </div>
        )}

        {/* form to send message */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              className="w-full input input-bordered rounded-lg input-sm sm:input-md"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            <button
              className={` sm:flex btn btn-circle btn-sm ${
                imagePreview ? "text-emerald-500" : "text-zinc-400"
              }`}
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current?.click();
              }}
            >
              <Image size={20} />
            </button>

            <button
              disabled={!text.trim() && !imagePreview}
              type="submit"
              className="btn btn-sm btn-circle"
            >
              <Send size={22} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageInput;
