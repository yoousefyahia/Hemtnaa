import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ForgetPassword.css";

const ForgetPassword = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 ">
      <div className="card shadow-lg p-5 w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-3 display-6">نسيت كلمة المرور</h2>
        <p className="text-center text-muted fs-5 mb-4">
          أدخل بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور.
        </p>
        <form>
          <div className="mb-4">
            <label className="form-label fs-5">البريد الإلكتروني</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="أدخل بريدك الإلكتروني"
              dir="rtl"
              style={{ textAlign: 'right' }}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100">
            إرسال الرمز
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
