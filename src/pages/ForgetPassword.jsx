import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ForgetPassword.css";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post("https://hemtna.onrender.com/auth/forgot-password", { email });
      setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح.");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 ">
      <div className="card shadow-lg p-5 w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-3 display-6">نسيت كلمة المرور</h2>
        <p className="text-center text-muted fs-5 mb-4">
          أدخل بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fs-5 w-100 text-end">البريد الإلكتروني</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="أدخل بريدك الإلكتروني"
              dir="rtl"
              style={{ textAlign: 'right' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
            {loading ? "جاري الإرسال..." : "إرسال"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
