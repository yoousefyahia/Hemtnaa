import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CODE_LENGTH = 6;

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "name@email.com";
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newCode = [...code];
    newCode[idx] = val[val.length - 1];
    setCode(newCode);
    if (idx < CODE_LENGTH - 1 && val) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (code[idx]) {
        const newCode = [...code];
        newCode[idx] = "";
        setCode(newCode);
      } else if (idx > 0) {
        inputsRef.current[idx - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    if (paste.length) {
      setCode(paste.split("").concat(Array(CODE_LENGTH - paste.length).fill("")));
      setTimeout(() => {
        if (inputsRef.current[paste.length - 1]) {
          inputsRef.current[paste.length - 1].focus();
        }
      }, 0);
    }
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const codeValue = code.join("");
    if (codeValue.length !== CODE_LENGTH) {
      setError("يرجى إدخال الرمز الكامل.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://hemtna.onrender.com/api/auth/verify-reset-code", { email, code: codeValue });
      navigate("/reset-password", { state: { email, code: codeValue } });
    } catch (err) {
      let errorMsg = "الكود غير صحيح أو انتهت صلاحيته.";
      if (err.response?.data?.message) errorMsg = err.response.data.message;
      else if (err.response?.data?.error) errorMsg = err.response.data.error;
      else if (err.message) errorMsg = err.message;
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    navigate("/forgot-password");
  };

  const handleResend = async () => {
    setResendMessage("");
    setResendError("");
    try {
      await axios.post("https://hemtna.onrender.com/api/auth/forgot-password", { email });
      setResendMessage("تم إرسال رمز جديد إلى بريدك الإلكتروني.");
    } catch (err) {
      let errorMsg = "حدث خطأ أثناء إعادة الإرسال.";
      if (err.response?.data?.message) errorMsg = err.response.data.message;
      else if (err.response?.data?.error) errorMsg = err.response.data.error;
      else if (err.message) errorMsg = err.message;
      setResendError(errorMsg);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ color: "#225c8b", fontWeight: 700, fontSize: 48, textAlign: "center" }}>اعادة تعيين كلمة المرور</h1>
      <p style={{ color: "#225c8b", fontWeight: 400, fontSize: 22, textAlign: "center", marginTop: 8 }}>من فضلك ادخل الرمز الذي ارسلناه اليك</p>
      <div style={{ color: "#7b8fa6", fontSize: 20, textAlign: "center", marginBottom: 24 }}> {email} </div>
      <form onSubmit={handleSubmit} style={{ width: 350, maxWidth: "90%", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32 }}>
          {code.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              ref={el => inputsRef.current[idx] = el}
              style={{
                width: 48,
                height: 48,
                fontSize: 28,
                textAlign: "center",
                border: "1.5px solid #225c8b",
                borderRadius: 8,
                outline: "none"
              }}
              autoFocus={idx === 0}
            />
          ))}
        </div>
        {error && <div style={{ color: "#d32f2f", textAlign: "center", marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", background: "#225c8b", color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 20, fontWeight: 600, marginBottom: 12 }} disabled={loading}>
          {loading ? "جاري التحقق..." : "تأكيد"}
        </button>
        <button type="button" onClick={handleChangeEmail} style={{ width: "100%", background: "#fff", color: "#225c8b", border: "1.5px solid #225c8b", borderRadius: 8, padding: "12px 0", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          تغيير البريد الالكتروني
        </button>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <span onClick={handleResend} style={{ color: "#225c8b", cursor: "pointer", fontSize: 16, textDecoration: "underline" }}>
            ارسال رمز اخر
          </span>
        </div>
        {resendMessage && <div style={{ color: '#388e3c', textAlign: 'center', marginBottom: 8 }}>{resendMessage}</div>}
        {resendError && <div style={{ color: '#d32f2f', textAlign: 'center', marginBottom: 8 }}>{resendError}</div>}
      </form>
    </div>
  );
};

export default VerifyCode; 