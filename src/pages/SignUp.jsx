import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Flag from 'react-world-flags';
import hemtna from "../assets/Hemtnaa.png";

function SignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    countryCode: '',
    phone: '',
    birthDate: '',
    childProblem: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Container className="mt-5 p-4 rounded" style={{ backgroundColor: '#fff', maxWidth: '600px' }}>
      <div className="text-center mb-4">
        <img src={hemtna} alt="الشعار" className="home-image" />
        <h2 className="fw-bold text-primary">التسجيل</h2>
        <p className="text-muted">يرجى إدخال بياناتك</p>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <div className="d-flex align-items-center">
          <div className={`rounded-circle border ${step === 1 ? 'bg-primary text-white' : ''}`} style={{ width: 25, height: 25, textAlign: 'center' }}>1</div>
          <div className="mx-2">من أنت؟</div>
        </div>
        <div className="border-top mx-3" style={{width: 100 }}></div>
        <div className="d-flex align-items-center">
          <div className={`rounded-circle border ${step === 2 ? 'bg-primary text-white' : ''}`} style={{ width: 25, height: 25, textAlign: 'center' }}>2</div>
          <div className="mx-2">المعلومات الشخصية</div>
        </div>
      </div>

      {step === 1 && (
        <>
          <Form.Select name="userType" value={formData.userType} onChange={handleChange} className="mb-3">
            <option value="">من أنت؟</option>
            <option value="parent">ولي أمر</option>
            <option value="doctor">طبيب</option>
            <option value="senior">طفل</option>
          </Form.Select>
          <Button className="w-100" onClick={nextStep}>التالي</Button>
        </>
      )}

      {step === 2 && (
        <>
          <Row>
            <Col><Form.Control name="firstName" placeholder="الاسم الأول" value={formData.firstName} onChange={handleChange} className="mb-3" /></Col>
            <Col><Form.Control name="lastName" placeholder="الاسم الأخير" value={formData.lastName} onChange={handleChange} className="mb-3" /></Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="mb-3"
              >
                <option value="">رمز الدولة</option>
                <option value="+20">مصر +20</option>
                <option value="+966">السعودية +966</option>
                <option value="+971">الإمارات +971</option>
                <option value="+1">الولايات المتحدة +1</option>
              </Form.Select>
            </Col>
            <Col md={8}>
              <Form.Control
                name="phone"
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={handleChange}
                className="mb-3"
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Control type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="mb-3" />
            </Col>
            <Col md={6}>
              <Form.Select name="childProblem" value={formData.childProblem} onChange={handleChange} className="mb-3">
                <option>مشكلة الطفل</option>
                <option value="autism">التوحد</option>
                <option value="adhd">ADHD(فرط حركه)</option>
                <option value="adhd">صعوبه السمع</option>
                <option value="adhd">صعوبه التكلم</option>
              </Form.Select>
            </Col>
          </Row>

          <Button className="w-100 mb-2" onClick={() => alert('تم التسجيل!')}>التسجيل</Button>
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
