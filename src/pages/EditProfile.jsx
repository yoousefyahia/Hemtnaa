import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Hemtnaa.png";
import icon1 from "../assets/Group 3.png";
import icon2 from "../assets/Group 2.png";
import icon3 from "../assets/Ellipse 5.png";
import profileHeader from "../assets/Group 1000005390.png";
import "../styles/EditProfile.css"
const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentProfile = location.state?.currentProfile || {};
  
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "••••••••",
    country: "",
    phone: "",
    education: "",
    experience: "",
    birthDate: ""
  });

  useEffect(() => {
    if (currentProfile) {
      setFormData({
        firstName: currentProfile.firstName || "يوسف",
        middleName: currentProfile.middleName || "يحيى",
        lastName: currentProfile.lastName || "السيد",
        email: currentProfile.email || "amrhemdan563@gmail.com",
        password: "••••••••",
        country: currentProfile.country || "مصر",
        phone: currentProfile.phone || "+20 1078544486",
        education: currentProfile.education || "بكالوريوس",
        experience: currentProfile.experience || "5 سنوات",
        birthDate: currentProfile.birthDate || "2023-03-07"
      });
    }
  }, [currentProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/profile", { 
      state: { 
        updatedProfile: {
          ...formData,
          birthDate: formatDate(formData.birthDate)
        } 
      } 
    });
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

  return (
    <div dir="rtl" style={{ minHeight: "100vh", position: "relative", backgroundColor: "#f8f9fa", textAlign: 'right' }}>
      {/* شريط التنقل مع الأيقونات */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{ padding: "20px 20px" }}>
        <div className="container-fluid justify-content-start ps-0">
          <div className="d-flex align-items-center gap-3">
            <img src={icon1} alt="أيقونة 1" width="45" height="45" style={{ objectFit: "contain" }} />
            <img src={icon2} alt="أيقونة 2" width="45" height="45" style={{ objectFit: "contain" }} />
            <img src={icon3} alt="أيقونة 3" width="45" height="45" style={{ objectFit: "contain" }} />
          </div>
        </div>
      </nav>

      {/* الشعار في أقصى اليمين */}
      <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 10 }}>
        <img src={logo} alt="شعار الموقع" style={{ height: "150px" }} />
      </div>

      {/* صورة الملف الشخصي في المنتصف */}
      <div className="d-flex justify-content-center" style={{ marginTop: "10px" }}>
        <div style={{ 
          height: "100px", 
          width: "100px",
          borderRadius: "10px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <img 
            src={profileHeader} 
            alt="صورة الملف الشخصي" 
            style={{ 
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      </div>

      {/*نموذج التعديل  */}
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
              <div className="col-md-4">
                <label className="form-label fw-bold">الاسم الأول</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#fff" }}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">الاسم الأوسط</label>
                <input
                  type="text"
                  className="form-control"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  style={{ backgroundColor: "#fff" }}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">الاسم الأخير</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#fff" }}
                />
              </div>
            </div>

            {/* البريد الإلكتروني وكلمة المرور */}
            <div className="row mb-3">
              <div className="col-md-8">
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
                    style={{ backgroundColor: "#fff" }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">كلمة المرور</label>
                <div className="input-group">
                  <button 
                    type="button" 
                    className="btn btn-outline-primary"
                    onClick={() => alert("سيتم إضافة وظيفة تعديل كلمة المرور لاحقًا")}
                  >
                    تعديل
                  </button>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.password}
                    readOnly
                    style={{ backgroundColor: "#fff" }}
                  />
                </div>
              </div>
            </div>

            {/* الدولة والهاتف */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">الدولة</label>
                <select
                  className="form-select"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#fff" }}
                >
                  <option value="مصر">مصر</option>
                  <option value="الولايات المتحدة">الولايات المتحدة</option>
                  <option value="المملكة المتحدة">المملكة المتحدة</option>
                  <option value="الإمارات">الإمارات</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">الهاتف</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#fff" }}
                />
              </div>
            </div>

            {/* التعليم والخبرة */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">المستوى التعليمي</label>
                <select
                  className="form-select"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#fff" }}
                >
                  <option value="بكالوريوس">بكالوريوس</option>
                  <option value="ماجستير">ماجستير</option>
                  <option value="دكتوراه">دكتوراه</option>
                  <option value="دبلوم">دبلوم</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">سنوات الخبرة</label>
                <select
                  className="form-select"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#fff" }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(year => (
                    <option key={year} value={`${year} سنوات`}>{year} سنوات</option>
                  ))}
                </select>
              </div>
            </div>

            {/* تاريخ الميلاد */}
            <div className="mb-4">
              <label className="form-label fw-bold">تاريخ الميلاد</label>
              <input
                type="date"
                className="form-control"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
                style={{ backgroundColor: "#fff" }}
              />
            </div>

            {/* أزرار الحفظ والإلغاء */}
            <div className="d-flex justify-content-start gap-2 mt-4">
              <button
                type="submit" 
                className="btn btn-primary px-4"
                style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd" }}
              >
                حفظ التغييرات
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => navigate("/profile")}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;