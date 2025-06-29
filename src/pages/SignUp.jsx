import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import hemtna from "../assets/Hemtnaa.png";
import "../styles/sign.css";
import DatePicker, { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar";
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { Route } from 'react-router-dom';
import ForgetPassword from './ForgetPassword';

registerLocale("ar", ar);

function SignUp() {
  const [step, setStep] = useState(1);
  const [showToast, setShowToast] = useState(false); 
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    childProblem: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const validate = () => {
    const newErrors = {};
    if (!formData.userType) newErrors.userType = "من فضلك اختر نوع المستخدم";
    if (!formData.firstName) newErrors.firstName = "من فضلك أدخل الاسم الأول";
    if (!formData.lastName) newErrors.lastName = "من فضلك أدخل الاسم الأخير";
    if (!formData.email) newErrors.email = "من فضلك أدخل البريد الإلكتروني";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "من فضلك أدخل بريد إلكتروني صحيح";
    if (!formData.phone) newErrors.phone = "من فضلك أدخل رقم الهاتف";
    if (!formData.birthDate) newErrors.birthDate = "من فضلك اختر تاريخ الميلاد";
    if (!formData.childProblem) newErrors.childProblem = formData.userType === "doctor" ? "من فضلك اختر تخصص الطبيب" : "من فضلك اختر مشكلة الطفل";
    if (!formData.password) newErrors.password = "من فضلك أدخل كلمة المرور";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمة المرور وتأكيد كلمة المرور غير متطابقين";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setShowToast(true);
    }
  };

  return (
    <Container className="mt-5 p-4 rounded" style={{ backgroundColor: '#fff', maxWidth: '600px' }}>
      
      {/*  Toast Message */}
      <ToastContainer position="top-center" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
          <Toast.Body className="text-white text-center fw-bold">تم التسجيل بنجاح </Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="text-center mb-4">
        <img src={hemtna} alt="الشعار" className="home-image" />
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
          <Form.Select name="userType" value={formData.userType} onChange={handleChange} className="mb-3" dir="rtl">
            <option value="">من أنت؟</option>
            <option value="doctor">طبيب</option>
            <option value="senior">طفل</option>
          </Form.Select>
          {errors.userType && <div className="text-danger">{errors.userType}</div>}

          <Button
            className="w-100"
            onClick={() => {
              if (!formData.userType) {
                setErrors({ userType: "من فضلك اختر نوع المستخدم" });
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
            <Col>
              <Form.Control name="firstName" placeholder="الاسم الاخير" value={formData.firstName} onChange={handleChange} className="mb-3" dir="rtl" style={{ textAlign: 'right' }} />
              {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
            </Col>
            <Col>
              <Form.Control name="lastName" placeholder="الاسم الاول" value={formData.lastName} onChange={handleChange} className="mb-3" dir="rtl" style={{ textAlign: 'right' }} />
              {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Control 
                type="email"
                name="email"
                placeholder="email"
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
              <div className="w-100" style={{ position: "relative" }}>
                <DatePicker
                  selected={formData.birthDate ? new Date(formData.birthDate) : null}
                  onChange={date => setFormData({ ...formData, birthDate: date ? date.toISOString().split('T')[0] : '' })}
                  placeholderText="يوم/شهر/سنة"
                  dateFormat="dd/MM/yyyy"
                  locale="ar"
                  calendarStartDay={6}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  isClearable
                  popperPlacement="bottom"
                  name="birthDate"
                  id="birthDate"
                  calendarClassName="datepicker-rtl"
                  customInput={
                    <input
                      className="form-control mb-3"
                      style={{ paddingLeft: "2.5rem", direction: "rtl", textAlign: "right", width: "100%" }}
                      placeholder="يوم/شهر/سنة"
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
              {errors.birthDate && <div className="text-danger">{errors.birthDate}</div>}
            </Col>
           <Col md={6}>
  <Form.Control
    type="text"
    name="childProblem"
    value={formData.childProblem}
    onChange={handleChange}
    placeholder={
      formData.userType === "doctor"
        ? "اكتب تخصص الطبيب"
        : "اكتب مشكلة الطفل"
    }
    className="mb-3"
    dir="rtl"
    style={{ textAlign: 'right' }}
  />
  {errors.childProblem && <div className="text-danger">{errors.childProblem}</div>}
</Col>

          </Row>

          <Form.Control
            type="password"
            name="password"
            placeholder="password"
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
            placeholder="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mb-3"
            dir="ltr"
            style={{ textAlign: 'left' }}
          />
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}

          <Button className="w-100 mb-2" onClick={handleSubmit}>التسجيل</Button>
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
