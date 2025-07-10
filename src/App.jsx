import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Home from "./components/posts/Home";
import AnimatedBackground from './components/AnimatedBackground';
import ResetPassword from "./pages/ResetPassword";
import VerifyCode from "./pages/VerifyCode";
import DoctorDemo from "./pages/DoctorDemo";

function App() {
  return (
    <>
      <AnimatedBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/doctor-demo" element={<DoctorDemo />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
