import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import ForgetPassword from "./auth/ForgetPassword";
import SignUp from "./auth/SignUp";
import ChildLandingPage from "./child-ui/landing/ChildLandingPage";
import ChildProfile from "./child-ui/profile/ChildProfile";
import EditProfile from "./auth/EditProfile";
import ChildHome from "./child-ui/home/ChildHome";
import AnimatedBackground from './components/AnimatedBackground';
import ResetPassword from "./auth/ResetPassword";
import VerifyCode from "./auth/VerifyCode";

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
            <Route path="/landing" element={<ChildLandingPage />} />
            <Route path="/profile" element={<ChildProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/posts" element={<ChildHome />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
