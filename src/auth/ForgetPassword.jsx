import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/ForgetPassword.sass";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post("https://hemtna.onrender.com/api/auth/forgot-password", { email });
      setMessage("تم إرسال كود التحقق إلى بريدك الإلكتروني بنجاح.");
      setTimeout(() => navigate("/verify-code", { state: { email } }), 2000);
    } catch (err) {
      console.log('Forget password error:', err);
      console.log('err.response:', err.response);
      console.log('err.message:', err.message);
      setError(err.response?.data?.message || "حدث خطأ. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-100 responsive-card" style={{ maxWidth: "400px" }}>
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
