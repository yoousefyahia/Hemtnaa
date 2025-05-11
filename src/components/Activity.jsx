import React from "react";

const Activities = () => (
  <div className="container text-right" dir="rtl" style={{ position: "relative", minHeight: "70vh" }}>
    <div className="d-flex flex-column align-items-start">
      {[1, 2, 3, 4].map((num) => (
        <div className="form-check my-2 d-flex align-items-center" key={num}>
          <input className="form-check-input ml-2" type="checkbox" id={`check${num}`} />
          <label className="form-check-label" htmlFor={`check${num}`}>
            أكل الطفل الطعام كاملاً
          </label>
        </div>
      ))}
    </div>
    <button className="btn btn-primary position-absolute" style={{ left: '0', bottom: '10px' }}>
      حفظ
    </button>
  </div>
);

export default Activities;
