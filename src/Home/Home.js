import React, { useState } from "react";
import { FaRegCommentAlt, FaRegHeart, FaRegEye } from "react-icons/fa";
import userAvatar from "../nav/84c1b0d51403f4f1d7e9bd56b7c704bb2bf992e9.jpg"; // Placeholder for user avatar
import CommentDialog from "./CommentDialog";
import Dialog from "./Dialog";
import imgnav from "../nav/84c1b0d51403f4f1d7e9bd56b7c704bb2bf992e9.jpg";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Post 1 Title",
      content:
        "إلى كل طفل يواجه صعوبة في النطق، أنت بطل يخطو خطوة جديدة كل يوم! \ud83d\udcaa\nللأولياء الأمور والمعلمين: صعوبات النطق لا تعني نهاية الطريق، بل بداية لرحلة تحتاج للصبر والدعم - تحدث مع الطفل بوضوح وصبر، واستمع إليه دون استعجال. - شاركه ألعاب وأنشطة تعزز الكلمات والحروف. - لا تنسى أن تشجعه على كل تقدم صغير، لأن الابتسامة والثناء أصدق دعم!",
      category: "Speech Therapy",
      doctor_id: "doc1",
      timestamp: "2023-10-27T10:00:00Z",
      isLiked: false,
      comments: [
        { author: "محمد علي", text: "تعليق رائع! شكراً للمعلومات القيمة." },
        {
          author: "فاطمة الزهراء",
          text: "أنا أواجه نفس المشكلة مع طفلي، هذا مفيد جداً.",
        },
      ],
    },
    {
      id: 2,
      title: "Post 2 Title",
      content:
        "إلى كل طفل يواجه صعوبة في النطق، أنت بطل يخطو خطوة جديدة كل يوم! \ud83d\udcaa\nللأولياء الأمور والمعلمين: صعوبات النطق لا تعني نهاية الطريق، بل بداية لرحلة تحتاج للصبر والدعم - تحدث مع الطفل بوضوح وصبر، واستمع إليه دون استعجال. - شاركه ألعاب وأنشطة تعزز الكلمات والحروف. - لا تنسى أن تشجعه على كل تقدم صغير، لأن الابتسامة والثناء أصدق دعم!",
      category: "Child Development",
      doctor_id: "doc2",
      timestamp: "2023-10-26T15:30:00Z",
      isLiked: false,
      comments: [
        { author: "أحمد محمود", text: "نصائح عملية جداً، سأطبقها مع ابني." },
      ],
    },
    {
      id: 3,
      title: "Post 3 Title",
      content:
        "إلى كل طفل يواجه صعوبة في النطق، أنت بطل يخطو خطوة جديدة كل يوم! \ud83d\udcaa\nللأولياء الأمور والمعلمين: صعوبات النطق لا تعني نهاية الطريق، بل بداية لرحلة تحتاج للصبر والدعم - تحدث مع الطفل بوضوح وصبر، واستمع إليه دون استعجال. - شاركه ألعاب وأنشطة تعزز الكلمات والحروف. - لا تنسى أن تشجعه على كل تقدم صغير، لأن الابتسامة والثناء أصدق دعم!",
      category: "Parenting Tips",
      doctor_id: "doc3",
      timestamp: "2023-10-25T08:45:00Z",
      isLiked: false,
      comments: [],
    },
  ]);

  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleLikeToggle = (id) => {
    setData((prevData) =>
      prevData.map((post) =>
        post.id === id ? { ...post, isLiked: !post.isLiked } : post
      )
    );
  };

  const handleAddCommentToPost = (postId, newCommentText) => {
    setData((prevData) =>
      prevData.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { author: "أنت", text: newCommentText, isLiked: false }, // Assuming "You" as author for new comments
              ],
            }
          : post
      )
    );
  };

  const handleCommentClick = (postId) => {
    setSelectedPostId(postId);
    setIsCommentDialogOpen(true);
  };

  const handleCloseCommentDialog = () => {
    setIsCommentDialogOpen(false);
    setSelectedPostId(null);
  };

  const handleNewPost = (newPost) => {
    setData((prevData) => [newPost, ...prevData]);
  };

  const postComments = selectedPostId
    ? data.find((post) => post.id === selectedPostId)?.comments || []
    : [];

  return (
    <div className="posts-container">
      <div className="Publish">
        <div className="Publication">
          <img src={imgnav} />
          <Dialog onPostCreated={handleNewPost} />
        </div>
      </div>
      {data.map((item, index) => (
        <div
          key={item.id}
          className={`post-card ${index % 2 === 0 ? "blue" : "yellow"}`}
        >
          <div className="post-header">
            <img
              src={userAvatar}
              alt="User Avatar"
              className="post-user-avatar"
            />
            <div className="post-user-info">
              <h3>د/عمرو</h3>
              <p className="post-time">منذ ساعتين</p>
            </div>
          </div>
          <div className="post-content">
            <p>{item.content}</p>
          </div>
          <div className="post-actions">
            <div
              className={`post-action-item ${item.isLiked ? "liked" : ""}`}
              onClick={() => handleLikeToggle(item.id)}
            >
              <span>اعجاب</span>
              <FaRegHeart className="post-action-icon" />
            </div>
            <div
              className="post-action-item"
              onClick={() => handleCommentClick(item.id)}
            >
              <span>تعليق</span>
              <FaRegCommentAlt className="post-action-icon" />
            </div>
            <div className="post-action-item">
              <span className="post-view-count">3289</span>
              <FaRegEye className="post-action-icon" />
            </div>
          </div>
        </div>
      ))}

      {isCommentDialogOpen && (
        <CommentDialog
          isOpen={isCommentDialogOpen}
          onClose={handleCloseCommentDialog}
          comments={postComments}
          postId={selectedPostId}
          onAddComment={handleAddCommentToPost}
        />
      )}
    </div>
  );
};

export default Home;