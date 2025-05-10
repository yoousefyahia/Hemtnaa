import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import userImage from "../assets/Ellipse 5.png";
import "../styles/NavBar.css";
const NavBar = () => {
  const [difficulty, setDifficulty] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setDifficulty("سهل");
        setProgress(30);
      }, 1000);
    };

    fetchData();
  }, []);

  const getProgressColor = (level) => {
    switch (level) {
      case "سهل":
        return "#24B600";
      case "متوسط":
        return "bg-warning";
      case "صعب":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const handleChange = (level, value) => {
    setDifficulty(level);
    setProgress(value);
  };

  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  return (
    <nav className=" navbar-expand-lg navbar-light bg-light px-2">
      <div className=" d-flex justify-content-between align-items-center">
        {/* صورة اليوزر */}
        <div className="d-flex align-items-center" onClick={handleProfileClick}>
          <img
            src={userImage}
            alt="اليوزر"
            className="user rounded-circle"
            width="80"
            height="80"
            style={{ cursor: "pointer" }} 
          />
          <span className="ms-2">مرحبا</span>
        </div>

        {/* المؤشر */}
        <div style={{ width: "180px", textAlign: "end" }}>
          <div className="progress">
            <div
              className={`progress-bar ${getProgressColor(difficulty)}`}
              role="progressbar"
              style={{ width: `${progress}%`, backgroundColor: getProgressColor(difficulty) }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <small className="text-muted d-block mt-1">
            المستوى: {difficulty || "جارٍ التحميل..."} <br />
            نسبة الاكتمال: {progress}%
          </small>

          <div className="mt-2 d-flex gap-2 justify-content-end">
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => handleChange("سهل", 30)}
            >
              سهل
            </button>
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={() => handleChange("متوسط", 60)}
            >
              متوسط
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleChange("صعب", 90)}
            >
              صعب
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
