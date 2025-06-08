import React, { useRef, useState } from "react";
import { FaStar, FaEdit, FaSave, FaGraduationCap, FaCertificate, FaPhone, FaUser, FaTrash } from "react-icons/fa";
import './Profile.css';
import { FiAlignRight } from "react-icons/fi";
import Dialog from '../Home/Dialog';
import { createPortal } from 'react-dom';

const DeleteModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return createPortal(
    <div className="custom-modal-overlay" onClick={(e) => {
      // Prevent clicks on overlay from propagating to dialog or other elements
      e.stopPropagation();
      // onCancel(); // Optionally close modal when clicking outside
    }}>
      <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
        <h3>تسجيل خروج</h3>
        <p>هل انت متأكد من تسجيل الخروج ؟</p>
        <div className="modal-icon">
          <svg className="icon-triangle" width="110" height="110" viewBox="0 0 110 110">
            <polygon
              points="20,95 55,25 90,95 20,95"
              fill="none"
              stroke="#2196f3" /* Changed to blue */
              strokeWidth="4"
              strokeLinejoin="round"
              className="triangle-animated"
            />
          </svg>
          <span className="icon-exclamation">!</span>
        </div>
        <div className="modal-actions">
          <button className="modal-btn yes" onClick={onConfirm}>نعم</button>
          <button className="modal-btn no" onClick={onCancel}>لا</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Profile = () => {
  const dialogRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Doctor profile data
  const [doctorProfile, setDoctorProfile] = useState({
    name: "د. أحمد محمد",
    specialization: "أخصائي طب الأطفال",
    education: "دكتوراه في طب الأطفال - جامعة القاهرة",
    certificates: [
      "شهادة البورد الأمريكي في طب الأطفال",
      "شهادة متقدمة في علاج التوحد",
      "شهادة في التغذية العلاجية للأطفال"
    ],
    phone: "+20 123 456 7890",
    experience: "15 سنة خبرة"
  });

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setIsEditing(false);
    setShowDeleteModal(false); // Ensure modal is closed when dialog closes
  };

  const handleProfileEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (field, value) => {
    setDoctorProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = () => {
    console.log('Account deletion requested');
    // Here you would typically make an API call to delete the account
    setShowDeleteModal(false);
    closeDialog(); // Close the profile dialog after confirming deletion
    // You might want to redirect to login page or home page after deletion
    // window.location.href = '/login';
  };

  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
  };

  const handleNewPost = (newPost) => {
    console.log('New post created:', newPost);
  };

  return (
    <div className="rating-item-Dialog">
      <button onClick={openDialog} className="butt-DiologProfile">
        <FiAlignRight />
      </button>

      <dialog
        ref={dialogRef}
        className="boxDia-Profile"
        onCancel={(e) => e.preventDefault()}
        onClick={(e) => {
          const rect = dialogRef.current.getBoundingClientRect();
          const isClickOutside =
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom;

          if (isClickOutside) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        <div className="close-name close-name-Profile">
          <div className="img-name img-name-Profile">
            <h4>الملف الشخصي للدكتور</h4>
          </div>
          <button onClick={closeDialog} className="close">✕</button>
        </div>

        <div className="doctor-profile">
          <div className="profile-header">
            <div className="profile-image-container">
              <img 
                src={require('../Rinning/722f837b-b9db-4ef6-94bd-24b66670206a-removebg-preview.png')} 
                alt="Doctor Profile" 
                className="profile-image"
              />
              {isEditing && (
                <label className="image-upload-label">
                  <input type="file" accept="image/*" className="image-upload-input" />
                  <FaEdit className="edit-icon" />
                </label>
              )}
            </div>
            <div className="profile-info">
              {isEditing ? (
                <input
                  type="text"
                  value={doctorProfile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="profile-input"
                />
              ) : (
                <h3>{doctorProfile.name}</h3>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={doctorProfile.specialization}
                  onChange={(e) => handleProfileChange('specialization', e.target.value)}
                  className="profile-input"
                />
              ) : (
                <p className="specialization">{doctorProfile.specialization}</p>
              )}
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <FaGraduationCap className="detail-icon" />
              {isEditing ? (
                <input
                  type="text"
                  value={doctorProfile.education}
                  onChange={(e) => handleProfileChange('education', e.target.value)}
                  className="profile-input"
                />
              ) : (
                <p>{doctorProfile.education}</p>
              )}
            </div>

            <div className="detail-item">
              <FaPhone className="detail-icon" />
              {isEditing ? (
                <input
                  type="text"
                  value={doctorProfile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="profile-input"
                />
              ) : (
                <p>{doctorProfile.phone}</p>
              )}
            </div>

            <div className="certificates-section">
              <h4 className="section-icon"> الشهادات</h4>
              {isEditing ? (
                <div className="certificates-list">
                  {doctorProfile.certificates.map((cert, index) => (
                    <div key={index} className="certificate-item">
                      <input
                        type="text"
                        value={cert}
                        onChange={(e) => {
                          const newCerts = [...doctorProfile.certificates];
                          newCerts[index] = e.target.value;
                          handleProfileChange('certificates', newCerts);
                        }}
                        className="profile-input"
                      />
                      <button 
                        className="remove-certificate"
                        onClick={() => {
                          const newCerts = doctorProfile.certificates.filter((_, i) => i !== index);
                          handleProfileChange('certificates', newCerts);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button 
                    className="add-certificate"
                    onClick={() => {
                      const newCerts = [...doctorProfile.certificates, "شهادة جديدة"];
                      handleProfileChange('certificates', newCerts);
                    }}
                  >
                    + إضافة شهادة
                  </button>
                </div>
              ) : (
                <ul className="certificates-list">
                  {doctorProfile.certificates.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="profile-actions">
            <button 
              onClick={handleProfileEdit}
              className={`edit-profile-btn ${isEditing ? 'save' : ''}`}
            >
              {isEditing ? <FaSave /> : <FaEdit />}
              {isEditing ? 'حفظ' : 'تعديل'}
            </button>
            <button 
              onClick={handleDeleteAccount}
              className="delete-account-btn"
            >
              <FaTrash />
              حذف الحساب
            </button>
          </div>

        </div>
      </dialog>
      <DeleteModal
        show={showDeleteModal}
        onConfirm={confirmDeleteAccount}
        onCancel={cancelDeleteAccount}
      />
    </div>
  );
};

export default Profile;
