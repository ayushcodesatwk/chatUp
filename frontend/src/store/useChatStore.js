import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import axios from "axios";

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

      set({ message: res.data });
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

  setSelectedUser: async ( selectedUser ) => {
    set({ selectedUser });
  }
}));
