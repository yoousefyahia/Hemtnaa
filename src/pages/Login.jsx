import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import ellipse1 from "../assets/Ellipse 1.png";
import ellipse2 from "../assets/Ellipse 2.png";
import rectangle from "../assets/Rectangle.png";
import home from "../assets/home.png";
import group from "../assets/Group.png";
import hemtna from "../assets/Hemtnaa.png";
import axios from "axios";
import { useUser } from "../components/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setUser } = useUser();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صالح";
    }

    if (!password) {
      newErrors.password = "كلمة المرور مطلوبة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? 1 : 0;
  };
  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate() !== 1) return;
    try {
      // 1. Login
      const loginRes = await axios.post("https://hemtna.onrender.com/api/auth/login", { email, password });
      const token = loginRes.data.token;
      if (!token) throw new Error("لم يتم استلام رمز الدخول");
      localStorage.setItem("token", token);
      // 2. Get user info
      const meRes = await axios.get("https://hemtna.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(meRes.data);
      navigate("/landing");
    } catch (err) {
      setErrors({ general: "فشل تسجيل الدخول. تأكد من البيانات وحاول مرة أخرى." });
    }
  };

  const handleDemoLogin = () => {
    navigate("/landing");
  };

  return (
    <div className="login-container">
      <div 
        className="left-side" 
        style={{ backgroundImage: `url(${rectangle})` }}
      >
        <h2 id="text-log">تسجيل الدخول</h2>
        <img src={ellipse2} alt="الدائرة العلوية" className="circle-top" />
        <img src={ellipse1} alt="الدائرة السفلية اليسرى" className="circle-bottom-left" />
        <img src={home} alt="الرئيسية" className="home" />
      </div>

      <div className="right-side">
        <img src={hemtna} alt="الشعار" className="home-image" />
        <h1>أهلاً وسهلاً</h1>
        <p>يرجى إدخال بياناتك</p>

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
            style={{ textAlign: 'left' }}
          />
          <input 
            type="password" 
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="ltr"
            style={{ textAlign: 'left' }}
          />

          <div className="remember-forgot">
            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input type="checkbox" /> تذكرني
            </label>
            <Link to="/forgot-password">نسيت كلمة المرور؟</Link>
          </div>

          {errors.general && <div style={{ color: 'red', marginBottom: 8 }}>{errors.general}</div>}

          <button type="submit" className="login-btn">تسجيل الدخول</button>
          <button type="button" className="login-btn demo-btn" onClick={handleDemoLogin} style={{ marginTop: '10px', backgroundColor: '#ffc107', borderColor: '#ffc107' }}>
            عرض تجريبي
          </button>
        </form>

        <p>
          ليس لديك حساب؟ <Link to="/signup">إنشاء حساب</Link>
        </p>
      </div>

      <img src={group} alt="الدائرة الجماعية" className="group" />
    </div>
  );
};

export default Login;