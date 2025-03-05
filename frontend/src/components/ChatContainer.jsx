import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';


const ChatContainer = () => {

  const {messages, isMessagesLoading, getMessages, selectedUser} = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser._id]);


  if(isMessagesLoading) return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>
        <MessageSkeleton/>
        <MessageInput/>
    </div>
  )

  return (
    <div className='flex-1 flex flex-col overflow-auto'>

      <ChatHeader/>
      
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {/* {messages.map(message => (

          <div className={`chat ${message.sender._id === selectedUser._id ? "chat-end" : "chat-start"}`}>

            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <img src={message.sender.pic || "/avatar.png"} alt={message.sender.name} />
              </div>
            </div>

          </div>
        ))} */}
      
      </div>


      <MessageInput/>

    </div>
  )
}

export default ChatContainer;