import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state || {};

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!password) {
      setError("يرجى إدخال كلمة المرور الجديدة.");
      return;
    }
    if (!email || !code) {
      setError("حدث خطأ. يرجى إعادة المحاولة من البداية.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://hemtna.onrender.com/api/auth/reset-password", {
        email,
        code,
        password
      });
      setMessage("تم تغيير كلمة المرور بنجاح! سيتم توجيهك لتسجيل الدخول.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.log('Reset password error:', err);
      console.log('err.response:', err.response);
      console.log('err.message:', err.message);
      setError(err.response?.data?.message || err.response?.data?.error || "حدث خطأ. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-100 responsive-card" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-3 display-6">إعادة تعيين كلمة المرور</h2>
        {(!email || !code) && <div className="alert alert-danger">حدث خطأ في العملية. يرجى إعادة المحاولة من البداية.</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fs-5 w-100 text-end">كلمة المرور الجديدة</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="أدخل كلمة المرور الجديدة"
              dir="rtl"
              style={{ textAlign: 'right' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading || !email || !code}>
            {loading ? "جاري التغيير..." : "تغيير كلمة المرور"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 