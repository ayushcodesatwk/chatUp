import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("messages/users");

      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      
      const res = await axiosInstance.get(`messages/${userId}`);

      console.log("messages--", res);

      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data) => {
    
    const { selectedUser, messages } = get();
    console.log("selected user data--", data);

    try {
      const res = await axiosInstance.post(`messages/send/${selectedUser._id}`, data);

      set({ messages: [...messages, res.data]});

    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Sets the selected user in the chat store.
 * 
 * @param {Object} selectedUser - The user object to be set as the selected user.
 */

/******  dd855a43-52a8-4e89-a618-8ef52adc26ab  *******/
  setSelectedUser: async ( selectedUser ) => {
    set({ selectedUser });
  }
}));
