// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaHeart, FaComment } from "react-icons/fa";
// import defaultUserImg from '../../assets/user.png';
// import { useUser } from '../../components/UserContext';
// import './Home.css';

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [localPosts, setLocalPosts] = useState([]);
//   const [shownComments, setShownComments] = useState({});
//   const [commentInputs, setCommentInputs] = useState({});
//   const { user } = useUser();

//   useEffect(() => {
//     axios.get("https://hemtna.onrender.com/api/posts/")
//       .then(res => {
//         const apiPosts = (res.data.data || []).map(post => ({
//           ...post,
//           liked: false,
//           commentsList: [],
//         }));
//         setPosts(apiPosts);
//         setLocalPosts(apiPosts);
//       })
//       .catch(err => console.error("فشل في تحميل البوستات:", err));
//   }, []);

//   const decodeUnicode = str => {
//     try {
//       return decodeURIComponent(JSON.parse('"' + str.replace(/"/g, '\\"') + '"'));
//     } catch {
//       return str;
//     }
//   };

//   const formatDate = dateString => {
//     return new Date(dateString).toLocaleString("ar-EG", {
//       weekday: "short",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleLike = async (postId, currentLikes, liked) => {
//     const newLikes = liked ? Math.max(currentLikes - 1, 0) : currentLikes + 1;
//     try {
//       await axios.put(`https://hemtna.onrender.com/api/posts/${postId}`, { likes: newLikes });
//       setLocalPosts(prev => prev.map(post =>
//         post.id === postId ? { ...post, likes: newLikes, liked: !liked } : post
//       ));
//     } catch (err) {
//       console.error("فشل في تحديث اللايك:", err);
//     }
//   };

//   const toggleComments = async postId => {
//     setShownComments(prev => ({ ...prev, [postId]: !prev[postId] }));
//     const post = localPosts.find(p => p.id === postId);
//     if (post && !shownComments[postId]) {
//       try {
//         const res = await axios.get(`https://hemtna.onrender.com/api/posts/${postId}/comments`);
//         setLocalPosts(prev => prev.map(p =>
//           p.id === postId ? { ...p, commentsList: res.data || [] } : p
//         ));
//       } catch (err) {
//         console.error("فشل في تحميل التعليقات:", err);
//       }
//     }
//   };

//   const handleAddComment = async (postId, text) => {
//     if (!text || !user?.id) return;

//     try {
//       await axios.post(`https://hemtna.onrender.com/api/posts/${postId}/comment`, {
//         user_id: user.id,
//         comment: text
//       });

//       const res = await axios.get(`https://hemtna.onrender.com/api/posts/${postId}/comments`);
//       setLocalPosts(prev =>
//         prev.map(post =>
//           post.id === postId ? { ...post, commentsList: res.data || [] } : post
//         )
//       );
//       setCommentInputs(prev => ({ ...prev, [postId]: "" }));
//     } catch (err) {
//       console.error("فشل في إرسال التعليق:", err);
//     }
//   };

//   return (
//     <div className="container py-4 d-flex flex-column align-items-center" style={{ direction: "rtl" }}>
//       {localPosts.map(post => (
//         <div key={post.id} className="post-card card mb-4 p-3 w-100 shadow" style={{ maxWidth: "800px", textAlign: "right" }}>
//           <div className="d-flex align-items-center mb-3">
//             <img src={post.doctor_picture || defaultUserImg} alt="دكتور" className="rounded-circle me-2" width="50" height="50" />
//             <div>
//               <strong>{post.doctor_name}</strong>
//               <div className="text-muted small">{formatDate(post.timestamp)}</div>
//             </div>
//           </div>

//           {post.content && <p>{decodeUnicode(post.content)}</p>}
//           {post.image && <img src={post.image} alt="محتوى" className="img-fluid rounded mb-3" />}

//           <div className="d-flex gap-4 text-muted fs-6 mb-2">
//             <button className={`btn btn-link p-0 d-flex align-items-center${post.liked ? " liked" : ""}`}
//                     onClick={() => handleLike(post.id, post.likes || 0, post.liked)}>
//               <FaHeart className="me-1" style={{ color: post.liked ? "#d32f2f" : "#aaa" }} />
//               {post.likes || 0}
//             </button>
//             <button className="btn btn-link p-0 d-flex align-items-center"
//                     onClick={() => toggleComments(post.id)}>
//               <FaComment className="me-1 text-primary" />
//               {post.commentsList.length}
//             </button>
//           </div>

//           <div className="add-comment-box mb-2">
//             <input type="text" className="form-control" placeholder="أضف تعليق..."
//                    value={commentInputs[post.id] || ""}
//                    onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
//                    onKeyDown={e => { if (e.key === "Enter") handleAddComment(post.id, commentInputs[post.id]); }}
//                    dir="rtl" style={{ textAlign: "right" }} />
//             <button className="btn btn-primary btn-sm mt-2"
//                     onClick={() => handleAddComment(post.id, commentInputs[post.id])}>
//               إضافة
//             </button>
//           </div>

//           {shownComments[post.id] && (
//             <div className="comments-box bg-light p-2 rounded">
//               <h6>💬 التعليقات:</h6>
//               {post.commentsList.length
//                 ? post.commentsList.map((c, i) => (
//                   <div key={i} className="d-flex align-items-start mb-2">
//                     <img src={c.image || defaultUserImg} alt="صورة" className="rounded-circle me-2" width="32" height="32" />
//                     <div>
//                       <strong>{c.username}</strong>
//                       <div className="text-muted small">{formatDate(c.created_at)}</div>
//                       <div>{decodeUnicode(c.comment)}</div>
//                     </div>
//                   </div>
//                 ))
//                 : <div className="text-muted">لا توجد تعليقات بعد.</div>}
//             </div>
//           )}
//         </div>
//       ))}
//       {!localPosts.length && <p className="text-muted">لا توجد منشورات حالياً.</p>}
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaComment } from "react-icons/fa";
import defaultUserImg from '../../assets/user.png';
import { useUser } from '../../components/UserContext';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [localPosts, setLocalPosts] = useState([]);
  const [shownComments, setShownComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const { user } = useUser();

  useEffect(() => {
    axios.get("https://hemtna.onrender.com/api/posts/")
      .then(res => {
        const apiPosts = (res.data.data || []).map(post => ({
          ...post,
          liked: false,
          commentsList: [],
        }));
        setPosts(apiPosts);
        setLocalPosts(apiPosts);
      })
      .catch(err => console.error("فشل في تحميل البوستات:", err));
  }, []);

  const decodeUnicode = str => {
    try {
      return decodeURIComponent(JSON.parse('"' + str.replace(/"/g, '\\"') + '"'));
    } catch {
      return str;
    }
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleString("ar-EG", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLike = async (postId, currentLikes, liked) => {
    const newLikes = liked ? Math.max(currentLikes - 1, 0) : currentLikes + 1;
    try {
      await axios.put(`https://hemtna.onrender.com/api/posts/${postId}`, { likes: newLikes });
      setLocalPosts(prev => prev.map(post =>
        post.id === postId ? { ...post, likes: newLikes, liked: !liked } : post
      ));
    } catch (err) {
      console.error("فشل في تحديث اللايك:", err);
    }
  };

  const toggleComments = postId => {
    setShownComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = async (postId, text) => {
    if (!text) return;

    const newComment = {
      username: `${user.firstName} ${user.lastName}`,
      image: user.profileImage,
      text,
      createdAt: new Date().toISOString()
    };

    // تحديث محلي مباشر
    setLocalPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, commentsList: [...post.commentsList, newComment] }
          : post
      )
    );

    setCommentInputs(prev => ({ ...prev, [postId]: "" }));

    // إرسال للسيرفر
    try {
      await axios.post(`https://hemtna.onrender.com/api/posts/${postId}/comment`, {
        user_id: user.id,
        comment: text
      });
    } catch (err) {
      console.error("فشل في إرسال التعليق:", err);
    }
  };

  return (
    <div className="container py-4 d-flex flex-column align-items-center" style={{ direction: "rtl" }}>
      {localPosts.map(post => (
        <div key={post.id} className="post-card card mb-4 p-3 w-100 shadow" style={{ maxWidth: "800px", textAlign: "right" }}>
          <div className="d-flex align-items-center mb-3">
            <img src={post.doctor_picture || defaultUserImg} alt="دكتور" className="rounded-circle me-2" width="50" height="50" />
            <div>
              <strong>{post.doctor_name}</strong>
              <div className="text-muted small">{formatDate(post.timestamp)}</div>
            </div>
          </div>

          {post.content && <p>{decodeUnicode(post.content)}</p>}
          {post.image && <img src={post.image} alt="محتوى" className="img-fluid rounded mb-3" />}

          <div className="d-flex gap-4 text-muted fs-6 mb-2">
            <button className={`btn btn-link p-0 d-flex align-items-center${post.liked ? " liked" : ""}`}
              onClick={() => handleLike(post.id, post.likes || 0, post.liked)}>
              <FaHeart className="me-1" style={{ color: post.liked ? "#d32f2f" : "#aaa" }} />
              {post.likes || 0}
            </button>
            <button className="btn btn-link p-0 d-flex align-items-center"
              onClick={() => toggleComments(post.id)}>
              <FaComment className="me-1 text-primary" />
              {post.commentsList.length}
            </button>
          </div>

          <div className="add-comment-box mb-2">
            <input type="text" className="form-control" placeholder="أضف تعليق..."
              value={commentInputs[post.id] || ""}
              onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleAddComment(post.id, commentInputs[post.id]);
                }
              }}
              dir="rtl" style={{ textAlign: "right" }} />
            <button className="btn btn-primary btn-sm mt-2"
              onClick={() => handleAddComment(post.id, commentInputs[post.id])}>
              إضافة
            </button>
          </div>

          {shownComments[post.id] && (
            <div className="comments-box bg-light p-2 rounded">
              <h6>💬 التعليقات:</h6>
              {post.commentsList.length
                ? post.commentsList.map((c, i) => (
                  <div key={i} className="d-flex align-items-start mb-2">
                    <img src={c.image || defaultUserImg} alt="صورة" className="rounded-circle me-2" width="32" height="32" />
                    <div>
                      <strong>{c.username}</strong>
                      <div className="text-muted small">{formatDate(c.createdAt)}</div>
                      <div>{decodeUnicode(c.text)}</div>
                    </div>
                  </div>
                ))
                : <div className="text-muted">لا توجد تعليقات بعد.</div>}
            </div>
          )}
        </div>
      ))}
      {!localPosts.length && <p className="text-muted">لا توجد منشورات حالياً.</p>}
    </div>
  );
};

export default Home;
