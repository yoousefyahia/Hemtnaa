import React from "react";
import Home from "../home/ChildHome";
import ChatTabs from "../chat/ChatTabs";
import ChildGames from "./ChildGames";
import ChildActivity from "./ChildActivity";
import "./styles/ChildContent.sass";

const MainContent = ({ activeTab, activityProgress, setActivityProgress }) => {
  return (
    <div className="container-fluid p-4" style={{ marginRight: "0" }}>
      {activeTab === "home" && <Home />}
      {activeTab === "chat" && <ChatTabs />}
      {activeTab === "games" && <ChildGames />}
      {activeTab === "activities" && (
        <ChildActivity
          activityProgress={activityProgress}
          setActivityProgress={setActivityProgress}
        />
      )}
    </div>
  );
};

export default MainContent;
