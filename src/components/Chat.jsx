import React from "react";

const Chat = () => (
  <div className="container py-4">
    {/* الهيدر اللي فيه الزرين */}
    <div className="d-flex justify-content-center mb-4">
  <button className="btn btn-outline-secondary">فيديوهات</button>
  <button className="btn btn-outline-primary">منشورات</button>
</div>

    <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh", overflow: "hidden" }}>
      <p className="text-danger text-center" style={{ maxWidth: "100%" }}>
        جاري العمل على البيانات... <br /> وسيكون هذا الجزء متاح قريباً
      </p>
    </div>
  </div>
);

export default Chat;
