import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../components/UserContext";
import logo from "../../assets/Hemtnaa.jpeg";
import defaultUserImage from "../../assets/Ellipse 8.png";
import "./styles/ChildProfile.sass"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatDateArabic = (dateString) => {
  if (!dateString) return "";
  if (/[ء-ي]/.test(dateString)) return dateString;
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const profile = user;

  const [activeTab, setActiveTab] = useState("about");

  const handleEdit = () => {
    navigate("/edit-profile", { state: { currentProfile: profile } });
  };

  const handleBackHome = () => {
    navigate("/landing");
  };

  return (
    <div dir="rtl" style={{ textAlign: 'right' }}>
      <div className="mb-4" style={{ paddingRight: "20px" }}>
  <img 
    src={logo} 
    alt="شعار الموقع" 
    className="logo" 
  />
</div>


      {/* المحتوى الرئيسي */}
      <div className="container pref py-4" style={{ maxWidth: "600px" }}>
        {/* بطاقة المعلومات الشخصية */}
        <div className="card shadow-sm mb-4">
          <div className="card-body d-flex  align-items-center">
            <img
              src={profile.profileImage || defaultUserImage}
              alt="صورة المستخدم"
              className="rounded-circle ms-3"
              width="120"
              height="120"
            />
            <div>
              <h4 className="mb-1">{(profile.firstName || profile.first_name) + ' ' + (profile.lastName || profile.last_name)}</h4>
              <p className="text-muted mb-2">{profile.memberType}</p>
              <button
                onClick={handleEdit}
                className="btn btn-outline-primary"
                style={{ borderRadius: "20px" }}
              >
                تعديل الملف الشخصي
              </button>
            </div>
          </div>
        </div>

        {/* بطاقة المعلومات العامة */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light">
            <div className="d-flex gap-2">
              <button
                className={`btn btn-sm ${activeTab === "about" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setActiveTab("about")}
              >
                عني
              </button>
              <button
                className={`btn btn-sm ${activeTab === "info" ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setActiveTab("info")}
              >
                معلومات
              </button>
            </div>
          </div>
          <div className="card-body">
            {activeTab === "about" ? (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h6 className="fw-bold">التعليم</h6>
                  <p>{profile.education || profile.child_education_level || ''}</p>
                </div>
                {/* <div className="col-md-6 mb-3">
                  <h6 className="fw-bold">الخبرة</h6>
                  <p>{profile.experience}</p>
                </div> */}
                <div className="col-md-6">
                  <h6 className="fw-bold">تاريخ الميلاد</h6>
                  <p>{formatDateArabic(profile.birthDate || profile.child_birthdate)}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold">البلد</h6>
                  <p>{profile.country || ''}</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-muted">هذه معلومات إضافية عن المستخدم لعرض المزيد من التفاصيل مثل الهوايات، السيرة الذاتية، الإنجازات، إلخ.</p>
              </div>
            )}
          </div>
        </div>

        {/* بطاقة معلومات الحساب */}
        <div className="card shadow-sm">
          <div className="card-header bg-light">
            <h5 className="mb-0">تفاصيل الحساب</h5>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">البريد الإلكتروني</span>
              <span>{profile.email}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">الهاتف</span>
              <span className="ltr-text">
                {profile.country_code ? `+${profile.country_code} ` : ''}{profile.phone}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">تاريخ الانضمام</span>
              <span>{profile.joinDate}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">آخر نشاط</span>
              <span>{profile.lastActivity}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ maxWidth: '600px', marginTop: '20px' }}>
        <button
          type="button"
          className="custom-back-btn mb-3"
          onClick={handleBackHome}
        >
          <svg style={{marginLeft: 8}} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19L8 12L15 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          رجوع إلى الرئيسية
        </button>
      </div>
      <ToastContainer position="top-center" rtl />
    </div>
  );
};

export default Profile;