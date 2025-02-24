import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const result = axiosInstance.get("/auth/check");
      //use set to set any state variable
      set({ authUser: result.data });
    } catch (error) {
      console.log("Error checking authentication", error.message);
    }
  },

  signUp: async (data) => {
    try {
        //setting the loading state
      set({ isSigningUp: true });

      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data });

      toast.success("Account created successfully:" + res.data);
    
    } catch (error) {
    
        toast.error("Error creating account: " + error.message);
    
    } finally {
    
      //setting the loading state to false
      set({ isSigningUp: false });

    }
  },

  logout: async () => {

    try {
        const res = await axiosInstance.post("/auth/logout");
    
        if (res.data === true) {
          set({ authUser: null });
        }
        
        toast.success("Logged out successfully");
        
    } catch (error) {
        
        toast.error("Error logging out: " + error.message);
    }
  }
}));
