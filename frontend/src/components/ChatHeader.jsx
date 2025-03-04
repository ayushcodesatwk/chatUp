import React from "react";
import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/userAuthStore";


const ChatHeader = () => {

    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

  return (
    <>
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between   ">
          <div className="flex w-full items-center gap-3 justify-between">
            {/* Avatar */}
            <div className="flex gap-2">
              <div className="avatar ">
                <div className="size-10 rounded-full relative">
                  <img
                    src={selectedUser.pic || "/avatar.png"}
                    alt={selectedUser.name}
                  />
                </div>
              </div>

              {/* User info */}
              <div>
                <h3 className="font-medium">{selectedUser.name}</h3>
                <p className="text-sm text-base-content/70">
                  {onlineUsers.includes(selectedUser._id)
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            </div>

            {/* close button */}
            <button onClick={() => setSelectedUser(null)} className="">
              <X />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
