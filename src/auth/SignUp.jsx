import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import "./styles/sign.sass";
import DatePicker, { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar";
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useUser } from "../child-ui/components/UserContext";

registerLocale("ar", ar);

function SignUp() {
  const [step, setStep] = useState(1);
  const [showToast, setShowToast] = useState(false); 
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_type: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country_code: '',
    child_birthdate: '',
    child_education_level: '',
    child_problem: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const validate = () => {
    const newErrors = {};
    if (!formData.user_type) newErrors.user_type = "من فضلك اختر نوع المستخدم";
    if (!formData.first_name) newErrors.first_name = "من فضلك أدخل الاسم الأول";
    if (!formData.last_name) newErrors.last_name = "من فضلك أدخل الاسم الأخير";
    if (!formData.email) newErrors.email = "من فضلك أدخل البريد الإلكتروني";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "من فضلك أدخل بريد إلكتروني صحيح";
    if (!formData.phone) newErrors.phone = "من فضلك أدخل رقم الهاتف";
    // فقط لو كان ولي أمر
    if (formData.user_type !== "doctor" && !formData.child_birthdate) newErrors.child_birthdate = "من فضلك أدخل تاريخ ميلاد الطفل";
    if (!formData.child_problem) newErrors.child_problem = formData.user_type === "doctor" ? "من فضلك اختر تخصص الطبيب" : "من فضلك اختر مشكلة الطفل";
    // فقط لو كان ولي أمر
    if (formData.user_type !== "doctor" && !formData.child_education_level) newErrors.child_education_level = "من فضلك أدخل المستوى التعليمي للطفل";
    if (!formData.password) newErrors.password = "من فضلك أدخل كلمة المرور";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمة المرور وتأكيد كلمة المرور غير متطابقين";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    // استخراج كود الدولة والرقم بدون كود الدولة
    const phone = formData.phone || "";
    const match = phone.match(/^\+(\d{1,3})/);
    const country_code = match ? match[1] : "";
    const phone_without_code = phone.replace(/^\+\d{1,3}/, "");
    const registrationData = {
      user_type: formData.user_type,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: phone_without_code,
      country_code,
      category: 'A',
      child_birthdate: formData.child_birthdate,
      child_education_level: formData.child_education_level,
      child_problem: formData.child_problem,
      password: formData.password
    };
    console.log("registrationData", registrationData);
    try {
      const res = await axios.post("https://hemtna.onrender.com/api/auth/register", registrationData);
      localStorage.setItem("registeredEmail", formData.email);
      localStorage.setItem("registeredName", formData.first_name + " " + formData.last_name);
      setShowToast(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.log("Register error:", err);
      let errorMsg = "فشل التسجيل. حاول مرة أخرى.";
      if (err.response?.data?.message) errorMsg = err.response.data.message;
      else if (err.response?.data?.error) errorMsg = err.response.data.error;
      else if (err.message) errorMsg = err.message;
      setErrors({ general: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 p-4 rounded" style={{ backgroundColor: '#fff', maxWidth: '600px' }}>
      
      {/*  Toast Message */}
      <ToastContainer position="middle-center" className="p-3" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'fixed', zIndex: 9999 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
          <Toast.Body className="text-white text-center fw-bold">تم التسجيل بنجاح </Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="text-center mb-4">
        <img src={"/Hemtnaa.png"} alt="الشعار" className="home-image" />
        <h2 className="fw-bold text-primary">التسجيل</h2>
        <p className="text-muted">يرجى إدخال بياناتك</p>
      </div>

      {/* Step Indicator */}
      <div className="d-flex justify-content-center mb-4">
        <div className="d-flex align-items-center">
          <div className={`rounded-circle border ${step === 1 ? 'bg-primary text-white' : ''}`} style={{ width: 25, height: 25, textAlign: 'center' }}>1</div>
          <div className="mx-2">من أنت؟</div>
        </div>
        <div className="step-indicator-wrapper">
          <div className="step-indicator" style={{ left: `${(step - 1) * 50}%` }}></div>
        </div>
        <div className="d-flex align-items-center">
          <div className={`rounded-circle border ${step === 2 ? 'bg-primary text-white' : ''}`} style={{ width: 25, height: 25, textAlign: 'center' }}>2</div>
          <div className="mx-2">المعلومات الشخصية</div>
        </div>
      </div>

      {step === 1 && (
        <>
          <Form.Select name="user_type" value={formData.user_type} onChange={handleChange} className="mb-3" dir="rtl">
            <option value="">من أنت؟</option>
            <option value="parent">ولي أمر</option>
            <option value="doctor">طبيب</option>
          </Form.Select>
          {errors.user_type && <div className="text-danger">{errors.user_type}</div>}
          <Button
            className="w-100"
            onClick={() => {
              if (!formData.user_type) {
                setErrors({ user_type: "من فضلك اختر نوع المستخدم" });
              } else {
                setErrors({});
                nextStep();
              }
            }}
          >
            التالي
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Row>
            <Col style={{ order: 1 }}>
              <Form.Control name="last_name" placeholder="الاسم الأخير" value={formData.last_name} onChange={handleChange} className="mb-3" dir="rtl" style={{ textAlign: 'right' }} />
              {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
            </Col>
            <Col style={{ order: 2 }}>
              <Form.Control name="first_name" placeholder="الاسم الأول" value={formData.first_name} onChange={handleChange} className="mb-3" dir="rtl" style={{ textAlign: 'right' }} />
              {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Control 
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                className="mb-3"
                dir="ltr"
                style={{ textAlign: 'left' }}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <PhoneInput
                international
                defaultCountry="EG"
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                className="mb-3 w-100"
              />
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              {formData.user_type !== "doctor" && (
              <div className="w-100" style={{ position: "relative" }}>
                <DatePicker
                  selected={formData.child_birthdate ? new Date(formData.child_birthdate) : null}
                  onChange={date => setFormData({ ...formData, child_birthdate: date ? date.toISOString().split('T')[0] : '' })}
                  placeholderText="تاريخ ميلاد الطفل"
                  dateFormat="dd/MM/yyyy"
                  locale="ar"
                  calendarStartDay={6}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  isClearable
                  popperPlacement="bottom"
                  name="child_birthdate"
                  id="child_birthdate"
                  calendarClassName="datepicker-rtl"
                  customInput={
                    <input
                      className="form-control mb-3"
                      style={{ paddingLeft: "2.5rem", direction: "rtl", textAlign: "right", width: "100%" }}
                      placeholder="تاريخ ميلاد الطفل"
                      dir="rtl"
                    />
                  }
                />
                <FaRegCalendarAlt
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#888",
                    pointerEvents: "none"
                  }}
                />
              </div>
              )}
              {formData.user_type !== "doctor" && errors.child_birthdate && <div className="text-danger">{errors.child_birthdate}</div>}
            </Col>
            <Col md={formData.user_type === "doctor" ? 12 : 6}>
              <Form.Control
                type="text"
                name="child_problem"
                value={formData.child_problem}
                onChange={handleChange}
                placeholder={
                  formData.user_type === "doctor"
                    ? "اكتب تخصص الطبيب"
                    : "اكتب مشكلة الطفل"
                }
                className="mb-3"
                dir="rtl"
                style={{ textAlign: 'right' }}
              />
              {errors.child_problem && <div className="text-danger">{errors.child_problem}</div>}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {formData.user_type !== "doctor" && (
              <Form.Control
                name="child_education_level"
                placeholder="المستوى التعليمي للطفل"
                value={formData.child_education_level}
                onChange={handleChange}
                className="mb-3"
                dir="rtl"
                style={{ textAlign: 'right' }}
              />
              )}
              {formData.user_type !== "doctor" && errors.child_education_level && <div className="text-danger">{errors.child_education_level}</div>}
            </Col>
          </Row>
          <Form.Control
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            className="mb-3"
            dir="ltr"
            style={{ textAlign: 'left' }}
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="تأكيد كلمة المرور"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mb-3"
            dir="ltr"
            style={{ textAlign: 'left' }}
          />
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
          {errors.general && <div className="alert alert-danger mt-2 text-center">{errors.general}</div>}
          <Button className="w-100 mb-2" onClick={handleSubmit} disabled={loading}>
            {loading ? "جاري التسجيل..." : "التسجيل"}
          </Button>
          <Button variant="secondary" className="w-100" onClick={prevStep}>رجوع</Button>
        </>
      )}

      {step === 1 && (
        <div className="text-center mt-3">
          <Link to="/">الرجوع إلى تسجيل الدخول</Link>
        </div>
      )}
    </Container>
  );
}

export default SignUp;
