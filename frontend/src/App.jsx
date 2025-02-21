import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/userAuthStore";
import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  console.log("authUser---", authUser)

  // if (isCheckingAuth && !authUser) {
  //   return (
  //     <>
  //       <div className="flex justify-center items-center h-screen">
  //         <Loader className="animate-spin" />
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      <BrowserRouter>
        {/* navbar on top */}
        <Navbar />
        <Routes>
          <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" />}/>  
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/profile" element={<ProfilePage />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
