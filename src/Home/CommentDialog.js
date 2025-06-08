import React, { useState } from 'react';
import './CommentDialog.css';
import { MdClose } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';

const CommentDialog = ({ isOpen, onClose, comments, postId, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState(comments);

  // Update local comments when comments prop changes (e.g., from parent) and dialog is open
  React.useEffect(() => {
    if (isOpen) {
      setLocalComments(comments);
    }
  }, [comments, isOpen]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const commentToAdd = { author: "أنت", text: newComment, isLiked: false };
      onAddComment(postId, newComment);
      setLocalComments(prevComments => [...prevComments, commentToAdd]);
      setNewComment('');
    }
  };

  const handleCommentLikeToggle = (commentIndex) => {
    setLocalComments(prevComments =>
      prevComments.map((comment, index) =>
        index === commentIndex ? { ...comment, isLiked: !comment.isLiked } : comment
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="comment-dialog-overlay">
      <div className="comment-dialog">
        <div className="comment-dialog-header">
          <h2>التعليقات</h2>
          <button onClick={onClose} className="close comment-dialog-close-btn ">
            <MdClose />
          </button>
        </div>
        <div className="comment-dialog-body">
          <div className="comments-list">
            {localComments.length === 0 ? (
              <p className="no-comments">لا توجد تعليقات بعد.</p>
            ) : (
              localComments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <img src="https://via.placeholder.com/40" alt="User" className="comment-avatar" />
                  <div className="comment-content">
                    <p className="comment-author">{comment.author}</p>
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-actions">
                      <div
                        className={`comment-action-item ${comment.isLiked ? 'liked' : ''}`}
                        onClick={() => handleCommentLikeToggle(index)}
                      >
                        <FaRegHeart className="comment-action-icon" />
                        <span>اعجاب</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="comment-input-section">
            <textarea
              placeholder="أضف تعليقًا..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-textarea"
            ></textarea>
            <button onClick={handleAddComment} className="comment-submit-btn">
              إضافة تعليق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDialog; 