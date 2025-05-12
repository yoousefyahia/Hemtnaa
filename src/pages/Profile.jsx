import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import userImage from "../assets/Ellipse 8.png";
import logo from "../assets/Hemtnaa.png";
import "../styles/profile.css"
const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultProfile = {
    firstName: "يوسف",
    middleName: "يحيى",
    lastName: "السيد",
    email: "yoousefyahia@gmail.com",
    country: "مصر",
    phone: "+201053628577",
    education: "حضانه",
    // experience: "5 سنوات",
    birthDate: "7 مارس 2023",
    memberType: "طفل",
    joinDate: "12 أغسطس 2025",
    lastActivity: "منذ 22 دقيقه"
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    if (location.state?.updatedProfile) {
      setProfile(location.state.updatedProfile);
    }
  }, [location.state]);

  const handleEdit = () => {
    navigate("/edit-profile", { state: { currentProfile: profile } });
  };

  return (
    <div dir="rtl" style={{ textAlign: 'right' }}>
      <div className="mb-4" style={{ paddingRight: "20px" }}>
  <img 
    src={logo} 
    alt="شعار الموقع" 
    className="logo" 
    style={{ width: "100%", maxWidth: "180px", height: "auto" }} 
  />
</div>


      {/* المحتوى الرئيسي */}
      <div className="container pref py-4" style={{ maxWidth: "600px" }}>
        {/* بطاقة المعلومات الشخصية */}
        <div className="card shadow-sm mb-4">
          <div className="card-body d-flex  align-items-center">
            <img
              src={userImage}
              alt="صورة المستخدم"
              className="rounded-circle ms-3"
              width="120"
              height="120"
            />
            <div>
              <h4 className="mb-1">{profile.firstName} {profile.lastName}</h4>
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
                  <p>{profile.education}</p>
                </div>
                {/* <div className="col-md-6 mb-3">
                  <h6 className="fw-bold">الخبرة</h6>
                  <p>{profile.experience}</p>
                </div> */}
                <div className="col-md-6">
                  <h6 className="fw-bold">تاريخ الميلاد</h6>
                  <p>{profile.birthDate}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold">البلد</h6>
                  <p>{profile.country}</p>
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
              <span>{profile.phone}</span>
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
    </div>
  );
};

export default Profile;