import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/userAuthStore";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  console.log("theme--",theme);
  

  // if (isCheckingAuth && !authUser) {
  //   return (
  //     <>
  //       <div className="flex justify-center items-center h-screen">
  //         <Loader className="animate-spin" />
  //       </div>
  //     </>
  //   );
  // }

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <>
    <div data-theme={theme}>

      <BrowserRouter>
        {/* navbar on top */}
        <Navbar />
        <Routes>
          <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" />}/>
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/profile" element={!authUser ? <Navigate to="/login" /> : <ProfilePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </div>
    </>
  );
}

export default App;
