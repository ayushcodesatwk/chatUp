import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:4000";

export const useAuthStore = create((set, get) => ({
  onlineUsers: [],
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,
  checkAuth: async () => {
    try {
      const result = await axiosInstance.get("/auth/check");
      console.log("result from check auth--", result);

      //use set to set any state variable
      set({ authUser: result.data });

      get().connectSocket();
      
    } catch (error) {
      console.log("Error checking authentication", error.message);
    }
  },

  signUp: async (data) => {
    try {
      //setting the loading state
      set({ isSigningUp: true });

      console.log("form data---", data);

      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data });

      toast.success("Account created successfully");
      
      get().connectSocket();
    } catch (error) {
      toast.error("Error creating account: " + error.message);
    } finally {
      //setting the loading state to false
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });

      console.log("form data--", data);

      const res = await axiosInstance.post("/auth/login", data);

      console.log("response after login:", res);

      set({ authUser: res.data });

      //to call a method inside the store
      get().connectSocket();

      toast.success("Loggedin successfully");
    } catch (error) {
      toast.error("Error logging in: " + error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const { authUser } = get();

      console.log("logging out authUser--", authUser);
      const res = await axiosInstance.get("/auth/logout");

      console.log("response after logout:", res);

      if (res.status === 200) {
        set({ authUser: null });
      }
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.log("error logging out--", error);

      toast.error("Error logging out: " + error.message);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);

      set({ authUser: res.data });

      toast.success("Profile updated");

    } catch (error) {
      
      console.log("error in update profile--", error);
      toast.error(error.response.data.message);

    } finally {
      set({
        isUpdatingProfile: false,
      });
    }
  },

  connectSocket: () => {

      const {authUser} = get();
      if(!authUser || get().socket?.connected) return;

      const socket = io(BASE_URL,{
        query: {
          userId: authUser._id
        }
      });
      socket.connect();

      set({socket: socket});

      socket.on("getOnlineUsers", (userIds) => {
        set({onlineUsers: userIds});
      })
  },


  disconnectSocket: () => {
      // disconnect only when the socket is connected
     if(get().socket?.connected) get().socket.disconnect();
  }
}));
