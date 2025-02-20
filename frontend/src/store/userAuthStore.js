import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";

export const useAuthStore = create(set =>( {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const result = axiosInstance.get("/auth/check");
            //use set to set any state variable
            set({authUser: result.data});
        } catch (error) {
            console.log("Error checking authentication", error.message);
        } 
    }
}));
