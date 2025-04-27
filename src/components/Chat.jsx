import React from "react";

const Chat = () => (
  <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
    {/* الهيدر اللي فيه الزرين */}
    <div className="mb-5">
      <button className="btn btn-outline-secondary mx-2">فيديوهات</button>
      <button className="btn btn-outline-primary mx-2">منشورات</button>
    </div>

    <div className="d-flex justify-content-center align-items-center flex-grow-1">
      <p className="text-danger text-center">
        جاري العمل على البيانات... <br /> وسيكون هذا الجزء متاح قريباً
      </p>
    </div>
  </div>
);

export default Chat;