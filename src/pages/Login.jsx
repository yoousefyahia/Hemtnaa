import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ellipse1 from "../assets/Ellipse 1.png";
import ellipse2 from "../assets/Ellipse 2.png";
import rectangle from "../assets/Rectangle.png";
import home from "../assets/home.png";
import group from "../assets/Group.png";
import hemtna from "../assets/Hemtnaa.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    try {
      const response = await axios.post("https://hemtna.runasp.net/Auth/login", {
        Email: email,
        Password: password
      });

      // في حالة النجاح، يمكنك تخزين التوكن أو أي بيانات أخرى حسب الحاجة
      // ثم توجيه المستخدم إلى الصفحة الرئيسية
      navigate("/landing");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 && data.errors) {
          // معالجة أخطاء التحقق من الصحة
          const newErrors = {};
          if (data.errors.Email) {
            newErrors.email = data.errors.Email[0];
          }
          if (data.errors.Password) {
            newErrors.password = data.errors.Password[0];
          }
          setErrors(newErrors);
        } else if (status === 401) {
          // بيانات الاعتماد غير صحيحة
          setGeneralError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        } else {
          // أخطاء أخرى من الخادم
          setGeneralError("حدث خطأ غير متوقع. حاول مرة أخرى.");
        }
      } else {
        // مشكلة في الاتصال بالخادم
        setGeneralError("تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.");
      }
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
            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input type="checkbox" /> تذكرني
            </label>
            <Link to="/forgot-password">نسيت كلمة المرور؟</Link>
          </div>

          <button type="submit" className="login-btn">تسجيل الدخول</button>
        </form>

        {generalError && <p className="error">{generalError}</p>}

        <p>
          ليس لديك حساب؟ <Link to="/signup">إنشاء حساب</Link>
        </p>
      </div>

      <img src={group} alt="الدائرة الجماعية" className="group" />
    </div>
  );
};

export default Login;
