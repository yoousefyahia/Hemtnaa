import React, { useState } from "react";
import "./styles/VerifyCode.sass";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("https://hemtna.onrender.com/api/auth/verify-code", { email, code });
      setSuccess("تم التحقق بنجاح! يمكنك الآن إعادة تعيين كلمة المرور.");
      setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "كود التحقق غير صحيح أو حدث خطأ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-code-container">
      <form onSubmit={handleSubmit} className="verify-form">
        <h2>إدخال كود التحقق</h2>
        <input
          type="text"
          placeholder="أدخل كود التحقق"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "جاري التحقق..." : "تحقق"}
        </button>
      </form>
    </div>
  );
};

export default VerifyCode; 