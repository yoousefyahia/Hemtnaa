import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile"; // مكون البروفايل
import EditProfile from "./pages/EditProfile"; // مكون تعديل البروفايل

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} /> {/* صفحة البروفايل */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* صفحة تعديل البيانات */}
      </Routes>
    </Router>
  );
}

export default App;
