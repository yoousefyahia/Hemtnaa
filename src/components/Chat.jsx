import React from "react";

const Chat = () => (
  <div className="container py-4">
    {/* الهيدر اللي فيه الزرين */}
    <div className="d-flex justify-content-center gap-3 mb-4">
      <button className="btn btn-outline-secondary">فديوهات</button>
      <button className="btn btn-outline-primary">منشورات</button>
    </div>

    {/* رسالة البيانات */}
    <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
      <p className="text-danger  text-center">
        جاري العمل على البيانات... <br /> وسيكون هذا الجزء متاح قريباً
      </p>
    </div>
  </div>
);

export default Chat;
