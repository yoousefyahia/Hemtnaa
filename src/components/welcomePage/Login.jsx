import React, { useState } from "react";
import "../../styles/Login.css";
import { Link } from "react-router-dom";
import ellipse1 from "../../assets/Ellipse 1.png";
import ellipse2 from "../../assets/Ellipse 2.png";
import rectangle from "../../assets/Rectangle.png";
import home from "../../assets/home.png";
import group from "../../assets/Group.png";
import hemtna from "../../assets/Hemtnaa.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("تسجيل الدخول باستخدام", email, password);
    }
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
            placeholder="البريد الإلكتروني" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input 
            type="password" 
            placeholder="كلمة المرور" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="remember-forgot">
            <label><input type="checkbox" /> تذكرني</label>
            <Link to="/forgot-password">نسيت كلمة المرور؟</Link>
          </div>

          <button type="submit" className="login-btn">تسجيل الدخول</button>
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
