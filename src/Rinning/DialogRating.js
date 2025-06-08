import React, { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import './DialogRating.css';
import './Rating.css';

const DialogRating = () => {
  const dialogRef = useRef(null);
  const [postText, setPostText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => {
    dialogRef.current?.close();
    setRating(0);
    setPostText("");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('الأصدقاء');
  
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="rating-item-Dialog">
      {/* زر فتح المودال */}
      <button onClick={openDialog} className="butt-DiologRating butt-DiologRating-butt">
        مستوى 
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
              <h4>تقييم الطفل</h4>
          </div>
        <button onClick={closeDialog} className="close">✕</button>
          

        </div>
        <div className="img-name">
          <img src={require('../Rinning/722f837b-b9db-4ef6-94bd-24b66670206a-removebg-preview.png')} alt="img-name" />
              <h4>سلمي طارق</h4>
          </div>
        <div className="p-4">
          {/* Rating Stars Component */}
          <div className="rating-stars">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    size={30}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    color={(hover || rating) >= ratingValue ? "#ffd700" : "#ddd"}
                  />
                </label>
              );
            })}
          </div>
          <p className="rating-text">التقييم: {rating} من 5</p>
          <textarea
            placeholder="بم تفكر؟"
            className="sq-text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
        </div>
        <div className="dialog-buttons">
          <button
            onClick={() => {
              console.log("Post submitted:", { text: postText, rating: rating });
              closeDialog();
            }}
            className="dialog-btn send-btn">
            ارسال
          </button>
          <button
            onClick={closeDialog}
            className="dialog-btn cancel-btn">
            الغاء
          </button>
        </div>
      </dialog>
    </div> 
  );
};

export default DialogRating;
