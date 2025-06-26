import React, { useState, useEffect } from 'react';
import ActivityCard from './ActivityCard';

const activities = [
  {
    id: 1,
    title: 'اكل الطفل الطعام كامل',
    timeLeft: '2 ساعات',
    description: 'شرح هذا النشاط هو ان يقوم الطفل بالأكل الطعام كامل',
    image: 'https://img.freepik.com/free-photo/tree-blue-sky_1150-11129.jpg?w=200',
    checked: true,
  },
  {
    id: 2,
    title: 'اكل الطفل الطعام كامل',
    timeLeft: '2 ساعات',
    description: 'شرح هذا النشاط هو ان يقوم الطفل بالأكل الطعام كامل',
    image: 'https://img.freepik.com/free-photo/tree-blue-sky_1150-11129.jpg?w=200',
    checked: true,
  },
  {
    id: 3,
    title: 'اكل الطفل الطعام كامل',
    timeLeft: '2 ساعات',
    description: 'شرح هذا النشاط هو ان يقوم الطفل بالأكل الطعام كامل',
    image: 'https://img.freepik.com/free-photo/tree-blue-sky_1150-11129.jpg?w=200',
    checked: false,
  },
  {
    id: 4,
    title: 'اكل الطفل الطعام كامل',
    timeLeft: '2 ساعات',
    description: 'شرح هذا النشاط هو ان يقوم الطفل بالأكل الطعام كامل',
    image: 'https://img.freepik.com/free-photo/tree-blue-sky_1150-11129.jpg?w=200',
    checked: false,
  },
];

const Activity = ({ activityProgress, setActivityProgress }) => {
  const [activityList, setActivityList] = useState(activities);

  useEffect(() => {
    const completed = activityList.filter((a) => a.checked).length;
    const percent = Math.round((completed / activityList.length) * 100);
    setActivityProgress(percent);
  }, [activityList, setActivityProgress]);

  const handleCheck = (id) => {
    setActivityList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, checked: !a.checked } : a))
    );
  };

  return (
    <div>
      {activityList.map((activity) => (
        <ActivityCard
          key={activity.id}
          title={activity.title}
          timeLeft={activity.timeLeft}
          description={activity.description}
          image={activity.image}
          checked={activity.checked}
          onCheck={() => handleCheck(activity.id)}
        />
      ))}
      <button style={{
        marginTop: 16,
        marginBottom: 56,
        background: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '12px 32px',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        cursor: 'pointer',
        boxShadow: '0 2px 8px #0001',
      }}>
        حفظ
      </button>
    </div>
  );
};

export default Activity;
