import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.sass";
import { Link } from "react-router-dom";
import ellipse1 from "../assets/Ellipse 1.png";
import ellipse2 from "../assets/Ellipse 2.png";
import rectangle from "../assets/Rectangle.png";
import home from "../assets/home.png";
import group from "../assets/Group.png";
import hemtna from "../assets/Hemtnaa.jpeg";
import axios from "axios";
import { useUser } from "../child-ui/components/UserContext";
import defaultUserImage from "../assets/Ellipse 8.png";
import { Toast, ToastContainer } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
    setLoading(true);
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
      console.log("meRes.data after login:", meRes.data);
      setShowToast(true);
      setTimeout(() => {
        console.log("user_type:", meRes.data.user_type); // للتأكد من القيمة
        if (meRes.data.user_type === "doctor") {
          window.location.replace("https://ahmedfathy112.github.io/hemtna/");
        } else {
          navigate("/landing");
        }
      }, 1500);
    } catch (err) {
      console.log("Login error:", err);
      let errorMsg = "فشل تسجيل الدخول. تأكد من البيانات وحاول مرة أخرى.";
      if (err.response?.data?.message) errorMsg = err.response.data.message;
      else if (err.response?.data?.error) errorMsg = err.response.data.error;
      else if (err.message) errorMsg = err.message;
      setErrors({ general: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setUser({
      firstName: "مستخدم",
      lastName: "تجريبي",
      email: "demo@demo.com",
      password: "0000000",
      country: "مصر",
      phone: "+201000000000",
      education: "تجريبي",
      experience: "-",
      birthDate: "2010-01-01",
      profileImage: defaultUserImage,
      joinDate: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
      lastActivity: "الآن"
    });
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

          {errors.general && <div className="alert alert-danger text-center" style={{ marginBottom: 8 }}>{errors.general}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
          <button type="button" className="login-btn demo-btn" onClick={handleDemoLogin} style={{ marginTop: '10px', backgroundColor: '#ffc107', borderColor: '#ffc107' }}>
            عرض تجريبي
          </button>
        </form>

        <p>
          ليس لديك حساب؟ <Link to="/signup">إنشاء حساب</Link>
        </p>
      </div>

      <img src={group} alt="الدائرة الجماعية" className="group" />

      <ToastContainer position="middle-center" className="p-3" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'fixed', zIndex: 9999 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide bg="success">
          <Toast.Body className="text-white text-center fw-bold">تم تسجيل الدخول بنجاح</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Login;