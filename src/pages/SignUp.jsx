import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 
import PhoneInput from "react-phone-number-input"; 
import 'react-phone-number-input/style.css'; 
import hemtna from "../assets/Hemtnaa.png";  

function SignUp() {   
  const [step, setStep] = useState(1);   
  const [formData, setFormData] = useState({     
    userType: '',     
    firstName: '',     
    lastName: '',     
    phone: '',     
    birthDate: '',     
    childProblem: '',     
    password: '',   
    confirmPassword: '' 
  });   

  const [errors, setErrors] = useState({}); // حفظ الأخطاء للتحقق منها

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
    if (!formData.phone) newErrors.phone = "من فضلك أدخل رقم الهاتف";
    if (!formData.birthDate) newErrors.birthDate = "من فضلك اختر تاريخ الميلاد";
    if (!formData.childProblem) newErrors.childProblem = "من فضلك اختر مشكلة الطفل";
    if (!formData.password) newErrors.password = "من فضلك أدخل كلمة المرور";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمة المرور وتأكيد كلمة المرور غير متطابقين";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // إذا كانت الأخطاء فارغة فهذا يعني أن التحقق تم بنجاح
  };

  const handleSubmit = () => {
    if (validate()) {
      alert('تم التسجيل!');
    }
  };

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
        <div className="border-top mx-3" style={{ width: 100 }}></div>         
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
          {errors.userType && <div className="text-danger">{errors.userType}</div>}
          <Button className="w-100" onClick={nextStep}>التالي</Button>         
        </>       
      )}        

      {step === 2 && (         
        <>           
          <Row>             
            <Col><Form.Control name="firstName" placeholder="الاسم الأول" value={formData.firstName} onChange={handleChange} className="mb-3" /></Col>             
            <Col><Form.Control name="lastName" placeholder="الاسم الأخير" value={formData.lastName} onChange={handleChange} className="mb-3" /></Col>           
          </Row>            
          {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
          {errors.lastName && <div className="text-danger">{errors.lastName}</div>}

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
              <Form.Control type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="mb-3" />
              {errors.birthDate && <div className="text-danger">{errors.birthDate}</div>}             
            </Col>             
            <Col md={6}>               
              <Form.Select name="childProblem" value={formData.childProblem} onChange={handleChange} className="mb-3">
                <option>مشكلة الطفل</option>
                <option value="autism">التوحد</option>
                <option value="adhd">ADHD(فرط حركه)</option>
                <option value="hearing">صعوبة السمع</option>
                <option value="speech">صعوبة التكلم</option>
              </Form.Select>
              {errors.childProblem && <div className="text-danger">{errors.childProblem}</div>}             
            </Col>           
          </Row>            

          <Form.Control 
            type="password" 
            name="password" 
            placeholder="كلمة المرور" 
            value={formData.password} 
            onChange={handleChange} 
            className="mb-3" 
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}

          <Form.Control 
            type="password" 
            name="confirmPassword" 
            placeholder="تأكيد كلمة المرور" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            className="mb-3" 
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
