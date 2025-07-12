import React, { useState } from "react";
import "./styles/ResetPassword.sass";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://hemtna.onrender.com/api/auth/reset-password", { email, password });
      setSuccess("تمت إعادة تعيين كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <h2>إعادة تعيين كلمة المرور</h2>
        <input
          type="password"
          placeholder="كلمة المرور الجديدة"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="تأكيد كلمة المرور"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "جاري الحفظ..." : "حفظ"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword; 