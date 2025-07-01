import React from "react";
import { useNavigate } from "react-router-dom"; 
import { useUser } from "./UserContext";
import "../styles/NavBar.css";
import { useState, useRef } from "react";
import logo from "../assets/Hemtnaa.png";
import defaultUserImage from "../assets/user.png";

const NavBar = ({ progress = 0, showProgress = true, reverseLayout = false, activeTab }) => {
  const navigate = useNavigate(); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { user } = useUser();

  const getProgressColor = (progress) => {
    if (progress < 40) return "#24B600";     // أخضر
    if (progress < 75) return "#FFC107";     // أصفر
    return "#DC3545";                         // أحمر
  };

  const handleProfileClick = () => {
    setDropdownOpen((open) => !open);
  };

  const handleEditProfile = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/");
  };

  // إغلاق القائمة عند الضغط خارجها
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
<nav className="navbar-container navbar-expand-lg navbar-light bg-light px-3">
      <div className={`d-flex justify-content-between align-items-center w-100 ${reverseLayout ? 'flex-row-reverse' : ''}`}>
        {/* شعار اللوجو في أقصى اليمين */}
        {activeTab !== 'games' && activeTab !== 'activities' && (
          <img src={logo} alt="شعار الموقع" style={{ height: "60px", marginRight: 16 }} />
        )}
        {/* صورة اليوزر مع القائمة المنسدلة */}
        <div className="d-flex align-items-center position-relative" ref={dropdownRef}>
          <img
            src={user.profileImage || defaultUserImage}
            alt="اليورز"
            className="user rounded-circle"
            width="80"
            height="80"
            style={{ cursor: "pointer" }} 
            onClick={handleProfileClick}
          />
          {dropdownOpen && (
            <div className="dropdown-menu show" style={{ position: 'absolute', top: '90%', left: 0, minWidth: 150, zIndex: 10000, boxShadow: '0 2px 12px #0002', borderRadius: 10, padding: 0 }}>
              <button className="dropdown-item" style={{ width: '100%', textAlign: 'right', padding: '12px 18px', border: 'none', background: 'none' }} onClick={handleEditProfile}>
                تعديل الملف الشخصي
              </button>
              <button className="dropdown-item text-danger" style={{ width: '100%', textAlign: 'right', padding: '12px 18px', border: 'none', background: 'none' }} onClick={handleLogout}>
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
        {/* المؤشر */}
        {showProgress && (
        <div style={{ width: "180px", textAlign: "end" }}>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${progress}%`,
                backgroundColor: getProgressColor(progress)
              }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <small className="text-muted d-block mt-1">
            نسبة الاكتمال:% {progress}
          </small>
        </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
