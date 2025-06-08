import React, { useState } from 'react';
import './DialogRating.css';
import { FaStar, FaUserFriends, FaChartLine, FaComments, FaGripVertical, FaPlus, FaTimes, FaImages } from 'react-icons/fa';
import userAvatar from './722f837b-b9db-4ef6-94bd-24b66670206a-removebg-preview.png';
import DialogRating from './DialogRating';

const Rating = () => {
  const [activeView, setActiveView] = useState('list'); // 'list' or 'stats'
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  // Statistics data
  const stats = [
    { id: 1, title: 'إجمالي التقييمات', value: '4.8', icon: <FaStar className="stat-icon star" /> },
    { id: 2, title: 'عدد المستخدمين', value: '150', icon: <FaUserFriends className="stat-icon users" /> },
    { id: 3, title: 'معدل النمو', value: '+15%', icon: <FaChartLine className="stat-icon growth" /> },
    { id: 4, title: 'التعليقات', value: '48', icon: <FaComments className="stat-icon comments" /> },
  ];

  // Ratings list data
  const ratings = [
    {
      id: 1,
      name: 'Aya ali',
      date: '10 oct 2023 - 12:30 pm',
      status: 'سمع',
      image: userAvatar,
      rating: "مستوي"
    },
    {
      id: 2,
      name: 'Aya ali',
      date: '9 oct 2023 - 01:30 pm',
      status: 'سلكيات',
      image: userAvatar,
      rating: "مستوي"
    },
    {
      id: 3,
      name: 'Aya ali',
      date: '10 oct 2023 - 12:30 pm',
      status: 'صعوبات تعلم',
      image: userAvatar,
      rating: "مستوي"
    }
  ];

  // Handle adding new todo
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  // Handle deleting todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handle key press for adding todo
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImages(prev => [...prev, { id: Date.now(), url: e.target.result }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle image deletion
  const handleDeleteImage = (imageId) => {
    setSelectedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`star ${index < rating ? 'filled' : 'empty'}`}
      />
    ));
  };

  return (
    <div className="rating-container">
      <div className="rating-tabs">
        <button 
          className={`buttomst ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => setActiveView('list')}
        >
          قائمة التقييمات
        </button>
        <button 
          className={`buttomst  ${activeView === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveView('stats')}
        >
          اضافه نشاط
        </button>
      </div>

      {activeView === 'list' ? (
        <div className="rating-list-view">
          <div className="rating-list-header">
          <div className="header-item">التقييم</div>
            <div className="header-item">الحالة</div>
            <div className="header-item">التاريخ</div>
            <div className="header-item">الطفل</div>
          </div>
          {ratings.map((rating) => (
            <div key={rating.id} className="rating-item">
                <div className="rating-rating">
                    {/* <button className="rating-button">{rating.rating}</button> */}
                    <DialogRating/>
                </div>
                <div className="rating-status">{rating.status}</div>
                <div className="rating-date">{rating.date}</div>
                <div className="user-info">
                  <img src={rating.image} className="user-avatar" />
                  <span className="user-name">{rating.name}</span>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="activity-form">
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="اسم النشاط"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="حالة الطفل"
            />
          </div>

          <div className="date-inputs">
            <div className="date-input">
              <input
                type="date"
                className="form-input"
                placeholder="تاريخ البداية"
              />
            </div>
            <div className="date-input">
              <input
                type="date"
                className="form-input"
                placeholder="تاريخ الانتهاء"
              />
            </div>
          </div>

          {/* Todo List Component */}
          <div className="todo-container">
            <div className="todo-header">
              <h3>قائمة المهام</h3>
            </div>
            <div className="todo-input-group">
              <input
                type="text"
                className="todo-input"
                placeholder="أضف مهمة جديدة"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="add-todo-btn" onClick={handleAddTodo}>
                <FaPlus />
              </button>
            </div>
            <div className="todo-list">
              {todos.length === 0 ? (
                <div className="no-todos">لا توجد مهام حالياً</div>
              ) : (
                todos.map((todo) => (
                  <div key={todo.id} className="todo-item">
                    <div className="todo-drag-handle">
                      <FaGripVertical />
                    </div>
                    <div className="todo-text">{todo.text}</div>
                    <button
                      className="todo-delete-btn"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="form-group">
            <textarea
              className="textarea-description"
              placeholder="شرح النشاط"
            ></textarea>
          </div>

          <div className="image-upload-area">
            <input 
              type="file" 
              id="activity-image" 
              hidden 
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <label htmlFor="activity-image" className="upload-placeholder">
              <img 
                src={require('./5dd451a2cee37a4e1c59c120458b2f5371cc9e69.png')} 
                alt="upload" 
              />
              <p className="upload-text">اضافة صورة للنشاط</p>
              <p className="upload-subtext">يمكنك إضافة أكثر من صورة</p>
            </label>
            {selectedImages.length > 0 && (
              <div className="images-grid">
                {selectedImages.map((image) => (
                  <div key={image.id} className="image-preview-container">
                    <img src={image.url} alt="Preview" className="image-preview" />
                    <div className="image-preview-overlay">
                      <button 
                        className="delete-image-btn"
                        onClick={() => handleDeleteImage(image.id)}
                        type="button"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dialog-buttons">
            <button className="dialog-btn send-btn">
              إضافة
            </button>
            <button className="dialog-btn cancel-btn">
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating; 