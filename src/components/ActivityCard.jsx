import React from 'react';
import '../styles/ActivityCard.css';

const ActivityCard = ({
  title = 'اكل الطفل الطعام كامل',
  timeLeft = '2 ساعات',
  description = 'شرح هذا النشاط هو ان يقوم الطفل بالأكل الطعام كامل',
  image = 'https://img.freepik.com/free-photo/tree-blue-sky_1150-11129.jpg?w=200',
  checked = false,
  onCheck,
}) => {
  return (
    <div className="activity-card">
      <div className="activity-card-checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
        />
      </div>
      <div className="activity-card-content">
        <div className="activity-card-header">
          <span className="activity-card-title">{title}</span>
          <img src={image} alt="activity" className="activity-card-img" />
        </div>
        <div className="activity-card-time">
          <span>الوقت المتبقي للانتهاء: <span className="activity-card-time-left">{timeLeft}</span></span>
        </div>
        <div className="activity-card-desc">{description}</div>
      </div>
    </div>
  );
};

export default ActivityCard; 