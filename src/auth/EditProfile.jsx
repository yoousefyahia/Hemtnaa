import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Hemtnaa.jpeg";
import defaultUserImage from "../assets/Ellipse 8.png";
import { useUser } from "../child-ui/components/UserContext";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./styles/EditProfile.sass";
import DatePicker, { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar";
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

registerLocale("ar", ar);

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, updateUser, setUser } = useUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    education: "",
    experience: "",
    birthDate: ""
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(user.profileImage);

  useEffect(() => {
    setFormData({
      firstName: user.firstName || user.first_name || "",
      lastName: user.lastName || user.last_name || "",
      email: user.email || "",
      password: user.password || "",
      country: user.country || "",
      phone: user.phone || "",
      education: user.education || user.child_education_level || "",
      experience: user.experience || "",
      birthDate: user.birthDate || user.child_birthdate || ""
    });
    setProfileImage(user.profileImage);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone: value ? value.replace(/\s+/g, '') : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      profileImage
    });
    if (result.success) {
      // جلب بيانات المستخدم من السيرفر بعد التحديث
      try {
        const token = localStorage.getItem("token");
        const meRes = await axios.get("https://hemtna.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (meRes.data) {
          if (typeof setUser === 'function') setUser(meRes.data);
        }
      } catch (err) {}
      navigate("/profile");
    } else {
      if(result.error === 'يجب تسجيل الدخول أولاً') {
        alert('يجب تسجيل الدخول أولاً');
        navigate('/login');
      } else {
        alert("فشل تحديث الملف الشخصي. حاول مرة أخرى.");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "7 مارس 2023";
    
    const date = new Date(dateString);
    const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div dir="rtl" style={{ minHeight: "100vh", position: "relative", backgroundColor: "#f8f9fa", textAlign: 'right' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{ padding: "20px 20px" }}>
        <div className="container-fluid justify-content-start ps-0">
          <div className="d-flex align-items-center gap-3">
            <img src={user.profileImage || defaultUserImage} alt="صورة المستخدم" width="45" height="45" style={{ objectFit: "cover", borderRadius: "50%" }} />
          </div>
        </div>
      </nav>

      {/*الشعار*/}
      <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 10 }}>
        <img src={logo} alt="شعار الموقع" style={{ height: "150px" }} className="slogin" />
      </div>

      {/* صورة الملف الشخصي   */}
      <div className="d-flex justify-content-center" style={{ marginTop: "10px" }}>
        <div
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            position: "relative"
          }}
          onClick={() => document.getElementById('profileImageInput').click()}
        >
          <img
            src={profileImage || defaultUserImage}
            alt="صورة الملف الشخصي"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          {/* أيقونة الكاميرا */}
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              background: "#fff",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              border: "1px solid #ddd"
            }}
            onClick={e => {
              e.stopPropagation();
              document.getElementById('profileImageInput').click();
            }}
          >
            {/* SVG أيقونة كاميرا */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="13" r="3.2" stroke="#333" strokeWidth="1.5"/>
              <rect x="2.75" y="6.75" width="18.5" height="13.5" rx="3.25" stroke="#333" strokeWidth="1.5"/>
              <path d="M7 6V5.5C7 4.11929 8.11929 3 9.5 3H14.5C15.8807 3 17 4.11929 17 5.5V6" stroke="#333" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
        {/*  اختيار صورة جديدة */}
        <input
          type="file"
          id="profileImageInput"
          style={{ display: "none" }} 
          accept="image/*"
          onChange={handleImageChange} 
        />
      </div>

      {/* نموذج التعديل */}
      <div className="container py-4" style={{ maxWidth: "600px" }}>
        <div style={{ 
          backgroundColor: "#f0f2f5",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}>
          <h3 className="mb-4" style={{ fontWeight: "600", color: "#333" }}>تعديل الملف الشخصي</h3>
          <hr className="mb-4" />

          <form onSubmit={handleSubmit}>
            {/* حقول الاسم */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">الاسم الأول</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  dir="rtl"
                  style={{ backgroundColor: "#fff", textAlign: 'right' }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">الاسم الأخير</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  dir="rtl"
                  style={{ backgroundColor: "#fff", textAlign: 'right' }}
                />
              </div>
            </div>
            {/* البريد الإلكتروني */}
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label fw-bold">البريد الإلكتروني</label>
                <div className="input-group">
                  <span className="input-group-text">@</span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    dir="ltr"
                    style={{ backgroundColor: "#fff", textAlign: 'left' }}
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                حفظ التغييرات
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* زر الرجوع */}
      <div className="container" style={{ maxWidth: '600px', marginTop: '20px' }}>
        <button
          type="button"
          className="custom-back-btn mb-3"
          onClick={() => navigate('/profile')}
        >
          <svg style={{marginLeft: 8}} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19L8 12L15 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          رجوع إلى البروفايل
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
