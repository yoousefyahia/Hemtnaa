import React, { useState } from "react";
import ChildAIChat from "./ChildAIChat";
import ChildDoctorChat from "./ChildDoctorChat";

const ChatTabs = () => {
  const [activeTab, setActiveTab] = useState("ai");

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, justifyContent: 'center' }}>
        <button
          onClick={() => setActiveTab("ai")}
          style={{
            fontWeight: activeTab === "ai" ? "bold" : "normal",
            background: activeTab === "ai" ? "#1976d2" : "#fff",
            color: activeTab === "ai" ? "#fff" : "#1976d2",
            border: '1px solid #1976d2',
            borderRadius: 6,
            padding: '8px 18px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          المساعد الذكي
        </button>
        <button
          onClick={() => setActiveTab("doctor")}
          style={{
            fontWeight: activeTab === "doctor" ? "bold" : "normal",
            background: activeTab === "doctor" ? "#1976d2" : "#fff",
            color: activeTab === "doctor" ? "#fff" : "#1976d2",
            border: '1px solid #1976d2',
            borderRadius: 6,
            padding: '8px 18px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          التواصل مع الطبيب
        </button>
      </div>
      {activeTab === "ai" ? <ChildAIChat /> : <ChildDoctorChat />}
    </div>
  );
};

export default ChatTabs; 