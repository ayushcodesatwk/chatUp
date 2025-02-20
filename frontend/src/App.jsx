import React from "react";
import Authentication from "./components/authentication/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/authentication/Navbar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* navbar on top */}
        <Navbar/>
                                               
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
