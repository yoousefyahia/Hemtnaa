import React from 'react';
import { X } from 'lucide-react'; // Using a nice icon for the close button
import './styles/ChildDoctorProfileModal.sass';

const DoctorProfileModal = ({ doctor, onClose }) => {
  // We stop the click from propagating to the overlay, which would close the modal.
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <button className="modal-close-btn" onClick={onClose} title="إغلاق">
          <X size={28} />
        </button>
        
        <img 
          src={doctor.image} 
          alt={`Dr. ${doctor.name}`}
          className="modal-doctor-avatar"
        />
        
        <h2 className="modal-doctor-name">{doctor.name}</h2>
        
        <p className="modal-doctor-specialty">{doctor.specialty || 'أخصائي تخاطب وتنمية مهارات'}</p>
        
        <div className="modal-doctor-stats">
          <div className="stat-item">
            <span className="stat-value">{doctor.experience || 5}+</span>
            <span className="stat-label">سنوات خبرة</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{doctor.age || 32}</span>
            <span className="stat-label">العمر</span>
          </div>
        </div>

        <p className="modal-doctor-bio">
          {doctor.bio || 'طبيب متخصص في تشخيص وعلاج اضطرابات النطق واللغة لدى الأطفال، مع خبرة واسعة في برامج التدخل المبكر.'}
        </p>
      </div>
    </div>
  );
};

export default DoctorProfileModal; 