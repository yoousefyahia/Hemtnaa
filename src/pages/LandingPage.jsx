// src/pages/LandingPage.jsx
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/SideBar";
import NavBar from "../components/NavBar";
import MainContent from "../components/Content";
import "../styles/landing.css"

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [activityProgress, setActivityProgress] = useState(0);
  const [navProgress, setNavProgress] = useState(0);
  const lastActivityProgress = useRef(0);

  // Sync nav progress with tab
  useEffect(() => {
    if (activeTab === "activities") {
      setNavProgress(lastActivityProgress.current);
    } else {
      setNavProgress(0);
    }
  }, [activeTab]);

  // Update lastActivityProgress when activityProgress changes
  useEffect(() => {
    lastActivityProgress.current = activityProgress;
    if (activeTab === "activities") {
      setNavProgress(activityProgress);
    }
  }, [activityProgress, activeTab]);

  return (
    <div className="d-flex">
      <Sidebar setActiveTab={setActiveTab} />
      
      <div className="flex-fill landing-page-content">
        <NavBar progress={navProgress} showProgress={activeTab === 'activities' || activeTab === 'games'} />
        <MainContent activeTab={activeTab} activityProgress={activityProgress} setActivityProgress={setActivityProgress} />
      </div>
    </div>
  );
};

export default LandingPage;
