import React, { useState } from "react";
import DoctorChat from "./DoctorChat";
import AIChat from "./AIChat";

const Chat = () => {
  const [activeTab, setActiveTab] = useState("doctor");

  return (
    <div className="container d-flex flex-column align-items-center my-5 py-5">
      <div className="d-flex justify-content-between gap-4 mb-4" style={{ width: '100%', maxWidth: '400px' }}>
        <button
          className={`btn w-50 ${activeTab === "doctor" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("doctor")}
        >
          تحدث مع الدكتور
        </button>

        <button
          className={`btn w-50 ${activeTab === "ai" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("ai")}
        >
          المساعد الذكي
        </button>
      </div>

      {activeTab === "doctor" && <DoctorChat/>}
      {activeTab === "ai" && <AIChat/>}
    </div>
  );
};

export default Chat;
