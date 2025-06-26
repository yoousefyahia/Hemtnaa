import React from "react";
import Home from "./posts/Home";
import Chat from "../components/chat/Chat";
import Games from "../components/Games";
import Activity from "../components/Activity";

const MainContent = ({ activeTab, activityProgress, setActivityProgress }) => {
  return (
    <div className="container-fluid p-4" style={{ marginRight: "0" }}>
      {activeTab === "home" && <Home />}
      {activeTab === "chat" && <Chat />}
      {activeTab === "games" && <Games />}
      {activeTab === "activities" && (
        <Activity
          activityProgress={activityProgress}
          setActivityProgress={setActivityProgress}
        />
      )}
    </div>
  );
};

export default MainContent;
