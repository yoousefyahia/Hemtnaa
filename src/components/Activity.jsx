// import React, { useState, useEffect } from 'react';
// import ActivityCard from './ActivityCard';

// const now = Date.now();
// const activities = [
//   {
//     id: 1,
//     title: 'تناول وجبة صحية',
//     description: 'يجب على الطفل تناول وجبة غنية بالخضروات والفواكه.',
//     image: 'https://img.freepik.com/free-photo/healthy-food-kids_23-2148723456.jpg?w=200',
//     checked: true,
//     endTime: now + 2 * 60 * 60 * 1000,
//   },
//   {
//     id: 2,
//     title: 'ممارسة الرياضة',
//     description: 'ممارسة نشاط رياضي لمدة 30 دقيقة مثل الجري أو ركوب الدراجة.',
//     image: 'https://img.freepik.com/free-photo/kids-running-park_1150-11085.jpg?w=200',
//     checked: true,
//     endTime: now + 2 * 60 * 60 * 1000 + 10 * 60 * 1000,
//   },
//   {
//     id: 3,
//     title: 'قراءة قصة',
//     description: 'قراءة قصة قصيرة مع أحد أفراد العائلة.',
//     image: 'https://img.freepik.com/free-photo/mother-reading-book-her-daughter_23-2148234567.jpg?w=200',
//     checked: false,
//     endTime: now + 2 * 60 * 60 * 1000 + 20 * 60 * 1000,
//   },
//   {
//     id: 4,
//     title: 'رسم لوحة فنية',
//     description: 'استخدم الألوان لرسم لوحة تعبر عن مشاعرك اليوم.',
//     image: 'https://img.freepik.com/free-photo/kid-drawing-colorful-paint_1150-11234.jpg?w=200',
//     checked: false,
//     endTime: now + 2 * 60 * 60 * 1000 + 30 * 60 * 1000,
//   },
// ];

// const Activity = ({ activityProgress, setActivityProgress }) => {
//   const [activityList, setActivityList] = useState(activities);

//   useEffect(() => {
//     const completed = activityList.filter((a) => a.checked).length;
//     const percent = Math.round((completed / activityList.length) * 100);
//     setActivityProgress(percent);
//   }, [activityList, setActivityProgress]);

//   const handleCheck = (id) => {
//     setActivityList((prev) =>
//       prev.map((a) => (a.id === id ? { ...a, checked: !a.checked } : a))
//     );
//   };

//   // دالة لحساب الوقت المتبقي كنص
//   const getTimeLeftString = (endTime) => {
//     const diff = Math.max(0, endTime - Date.now());
//     const totalMinutes = Math.floor(diff / 60000);
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;
//     if (diff <= 0) return 'انتهى الوقت';
//     if (hours > 0) return `${hours} ساعة${hours > 1 ? '' : ''} و${minutes} دقيقة`;
//     return `${minutes} دقيقة`;
//   };

//   // إعادة رسم كل دقيقة لتحديث الوقت المتبقي
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActivityList(list => [...list]); // إعادة رسم فقط
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       {activityList.map((activity) => (
//         <ActivityCard
//           key={activity.id}
//           title={activity.title}
//           timeLeft={getTimeLeftString(activity.endTime)}
//           description={activity.description}
//           image={activity.image}
//           checked={activity.checked}
//           onCheck={() => handleCheck(activity.id)}
//         />
//       ))}
//       <button style={{
//         marginTop: 16,
//         marginBottom: 56,
//         background: '#1976d2',
//         color: '#fff',
//         border: 'none',
//         borderRadius: 8,
//         padding: '12px 32px',
//         fontWeight: 'bold',
//         fontSize: '1.1rem',
//         cursor: 'pointer',
//         boxShadow: '0 2px 8px #0001',
//       }}>
//         حفظ
//       </button>
//     </div>
//   );
// };

// export default Activity;
 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActivityCard from './ActivityCard';

const Activity = ({ activityProgress, setActivityProgress }) => {
  const [activityList, setActivityList] = useState([]);

  // جلب الأنشطة من الباك
  useEffect(() => {
    axios.get('https://hemtna.onrender.com/api/activities/')
      .then(res => {
        setActivityList(res.data.data || []);
      })
      .catch(err => console.error("فشل في تحميل الأنشطة:", err));
  }, []);

  // حساب نسبة الإنجاز
  useEffect(() => {
    const completed = activityList.filter((a) => a.checked).length;
    const percent = Math.round((completed / activityList.length) * 100);
    setActivityProgress(percent);
  }, [activityList, setActivityProgress]);

  // تحديث check في السيرفر والمحلي
  const handleCheck = (id, currentChecked) => {
    const updatedChecked = !currentChecked;
    axios.put(`https://hemtna.onrender.com/api/activities/${id}`, {
      checked: updatedChecked
    }).then(() => {
      setActivityList(prev =>
        prev.map(a => a.id === id ? { ...a, checked: updatedChecked } : a)
      );
    }).catch(err => console.error("فشل في تحديث النشاط:", err));
  };

  // الوقت المتبقي كنص
  const getTimeLeftString = (endTime) => {
    const diff = Math.max(0, new Date(endTime).getTime() - Date.now());
    const totalMinutes = Math.floor(diff / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (diff <= 0) return 'انتهى الوقت';
    if (hours > 0) return `${hours} ساعة و${minutes} دقيقة`;
    return `${minutes} دقيقة`;
  };

  // إعادة رسم كل دقيقة لتحديث الوقت المتبقي
  useEffect(() => {
    const interval = setInterval(() => {
      setActivityList(list => [...list]); // تحديث وهمي لإعادة الرسم
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {activityList.map((activity) => (
        <ActivityCard
          key={activity.id}
          title={activity.title}
          timeLeft={getTimeLeftString(activity.endTime)}
          description={activity.description}
          image={activity.image}
          checked={activity.checked}
          onCheck={() => handleCheck(activity.id, activity.checked)}
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
