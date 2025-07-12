import React, { useState } from "react";
import homeIcon from "../../assets/user.png";
import gamesIcon from "../../assets/icon-park-solid_game-ps.png";
import chatIcon from "../../assets/bx_chat.png";
import activitiesIcon from "../../assets/hugeicons_activity-01.png";
import "./styles/ChildSideBar.sass"; 

const Sidebar = ({ setActiveTab }) => {
  const [activeTabState, setActiveTabState] = useState("home");

  const handleTabChange = (tab) => {
    setActiveTabState(tab);
    setActiveTab(tab);
  };

  const renderButton = (tabKey, label, icon) => (
    <button
      className={`btn d-flex flex-column align-items-center ${
        activeTabState === tabKey ? "btn-primary" : "btn-light"
      } mb-3`}
      onClick={() => handleTabChange(tabKey)}
    >
      <img src={icon} alt={`${label} icon`} width="30" height="30" className="mb-1" />
      {label}
    </button>
  );

  return (
    <div className="d-flex flex-column align-items-center sidebar">
      {renderButton("home", "الرئيسية", homeIcon)}
     {renderButton("chat", "الدردشة", chatIcon)}
{renderButton("games", "الألعاب", gamesIcon)}
      {renderButton("activities", "الأنشطة", activitiesIcon)}
    </div>
  );
};

export default Sidebar;
