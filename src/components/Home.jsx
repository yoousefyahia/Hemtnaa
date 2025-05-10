// src/components/Home.jsx
import React from "react";

const Home = () => (
  <div className="d-flex flex-column justify-content-center align-items-center text-center px-3 py-5 w-100">
    {/* الزرين */}
    <div className="mb-4 d-flex flex-wrap justify-content-center gap-3">
      <button className="btn btn-outline-secondary">فيديوهات</button>
      <button className="btn btn-outline-primary">منشورات</button>
    </div>

    {/* الرسالة */}
    <p className="text-danger fs-5">
      جاري العمل على البيانات... <br />
      وسيكون هذا الجزء متاح قريباً
    </p>
  </div>
);

export default Home;
