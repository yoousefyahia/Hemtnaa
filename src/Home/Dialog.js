import React, { useRef, useState } from "react";
import './Diolog.css';
import imgDR from  '../nav/84c1b0d51403f4f1d7e9bd56b7c704bb2bf992e9.jpg';
import { FaImage } from "react-icons/fa";

const Dialog = ({ onPostCreated }) => {
  const dialogRef = useRef(null);
  const [activeTab, setActiveTab] = useState("all");
  const [postText, setPostText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('الأصدقاء');

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => {
    dialogRef.current?.close();
    setPostText(""); // Reset post text when closing
  };

  const [isOpen, setIsOpen] = useState(false);
  
  const options = ['سمعيات', 'سلوكيات', 'صعوبة تعلم'];
  
  const handleSelect = (option) => {
    setSelectedCategory(option);
    setIsOpen(false);
  };

  const handlePostSubmit = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(), // Generate unique ID
        title: "New Post",
        content: postText,
        category: selectedCategory,
        doctor_id: "doc1",
        timestamp: new Date().toISOString(),
        isLiked: false,
        comments: [],
      };
      
      onPostCreated(newPost);
      closeDialog();
    }
  };

  return (
    <div className="p-1">
      {/* زر فتح المودال */}
      <button onClick={openDialog} className="butt-Diolog">
        منشورات
      </button>

      {/* Dialog */}
    <dialog
        ref={dialogRef}
        className="boxDia"
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
        <div className="close-name">
        <div className="img-name">  
          <img src={imgDR} alt="Profile"/>            
            <h4>د. محمد عبدالله</h4>
          </div>
        <button onClick={closeDialog} className="close">✕</button>
          
        </div>

        <div className="p-2">
          <textarea
            placeholder="بم تفكر؟"
            className="sq-text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
<hr></hr>
          <div className="btn-upload">
            <label>               
              <FaImage /> 
              <h4 className='BTN-INPUT'>الصور والفيديوهات </h4>
               <input type="file" className="custom-file-input" accept="image/*,video/*"/>
            </label>
          </div>
<hr></hr>
        </div>
        <div className="post-button-container">
          <button
            onClick={handlePostSubmit}
            className="post-button"
            disabled={!postText.trim()}
          >
            نشر
          </button>
        </div>
      </dialog>
    </div> 
  );
};

export default Dialog;
