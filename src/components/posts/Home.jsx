import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaComment } from "react-icons/fa";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/posts/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error("فشل في تحميل البوستات:", error);
      });
  }, []);

  // دالة لفك ترميز الحروف العربية إذا كانت مشفرة
  const decodeUnicode = (str) => {
    try {
      return decodeURIComponent(JSON.parse('"' + str.replace(/"/g, '\\"') + '"'));
    } catch {
      return str;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ar-EG", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="container py-4 d-flex flex-column align-items-center"
      style={{ direction: "rtl" }}
    >
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="card mb-4 p-3 w-100 shadow"
            style={{
              maxWidth: window.innerWidth >= 992 ? "800px" : "600px",
              textAlign: "right",
            }}
          >
            {/* ✅ معلومات الدكتور يمين */}
            <div className="d-flex align-items-center justify-content-start mb-3">
              <img
                src={post.doctorImage}
                alt="دكتور"
                className="rounded-circle ms-2"
                width="50"
                height="50"
              />
              <div>
                <strong>{post.doctorName}</strong>
                <div className="text-muted small">
                  {formatDate(post.createdAt)}
                </div>
              </div>
            </div>

            {/* ✅ نص وصورة البوست */}
            {post.text && <p className="mb-2">{decodeUnicode(post.text)}</p>}
            {post.image && (
              <img
                src={post.image}
                alt="محتوى"
                className="img-fluid rounded mb-3"
              />
            )}

            {/* ✅ تفاعل: لايك + كومنت */}
            <div className="d-flex justify-content-end gap-4 text-muted fs-6">
              <div className="d-flex align-items-center">
                <FaHeart className="ms-1 text-danger" />{" "}
                {post.likesCount || 0}
              </div>
              <div className="d-flex align-items-center">
                <FaComment className="ms-1 text-primary" />{" "}
                {post.comments?.length || 0}
              </div>
            </div>

            {/* ✅ التعليقات */}
            {Array.isArray(post.comments) && post.comments.length > 0 && (
              <div className="bg-light p-2 rounded mt-3">
                <h6 className="mb-2">💬 التعليقات:</h6>
                {post.comments.map((comment, index) => (
                  <div key={index} className="border-bottom pb-1 mb-1">
                    <strong>{comment.username}:</strong> {decodeUnicode(comment.text)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-muted">لا توجد منشورات لعرضها حالياً.</p>
      )}
    </div>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Home = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     axios.get("") 
//       .then((res) => {
//         const data = res.data;

//         if (Array.isArray(data)) {
//           setPosts(data);
//         } else if (Array.isArray(data.posts)) {
//           setPosts(data.posts);
//         } else {
//           console.error("البيانات غير متوقعة:", data);
//           setPosts([]);
//         }
//       })
//       .catch((error) => {
//         console.error("فشل في تحميل البوستات:", error);
//       });
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString("ar-EG", {
//       weekday: "short",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="container py-4 d-flex flex-column align-items-center">
//       {Array.isArray(posts) && posts.length > 0 ? (
//         posts.map((post) => (
//           <div
//             key={post.id}
//             className="card mb-4 w-100"
//             style={{ maxWidth: "600px" }}
//           >
//             <div className="card-body">
//               {/* معلومات الدكتور */}
//               <div className="d-flex align-items-center mb-3">
//                 <img
//                   src={post.doctorImage}
//                   alt="دكتور"
//                   className="rounded-circle me-2"
//                   width="50"
//                   height="50"
//                 />
//                 <div>
//                   <strong>{post.doctorName}</strong>
//                   <div className="text-muted small">
//                     {formatDate(post.createdAt)}
//                   </div>
//                 </div>
//               </div>

//               {/* محتوى البوست */}
//               {post.text && <p className="mb-2">{post.text}</p>}
//               {post.image && (
//                 <img
//                   src={post.image}
//                   alt="محتوى"
//                   className="img-fluid rounded mb-2"
//                 />
//               )}

//               {/* عدد اللايكات */}
//               <p className="text-primary small mb-2">
//                 ❤️ {post.likesCount || 0} إعجاب
//               </p>

//               {/* التعليقات */}
//               {Array.isArray(post.comments) && post.comments.length > 0 && (
//                 <div className="bg-light p-2 rounded">
//                   <h6 className="mb-2">💬 التعليقات:</h6>
//                   {post.comments.map((comment, index) => (
//                     <div key={index} className="border-bottom pb-1 mb-1">
//                       <strong>{comment.username}:</strong> {comment.text}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-muted">لا توجد منشورات لعرضها حالياً.</p>
//       )}
//     </div>
//   );
// };

// export default Home;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaHeart, FaComment } from "react-icons/fa";

// const Home = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // بيانات وهمية مؤقتًا
//     setPosts([
//       {
//         id: 1,
//         doctorName: "د. أحمد علي",
//         doctorImage: "/images/ahmed.jpg",
//         createdAt: "2025-06-25T08:30:00Z",
//         text: "مرحبًا بكم في منصتنا!",
//         image: "/images/post1.jpg",
//         likesCount: 12,
//         comments: [
//           { username: "مروة", text: "جميل 👌" },
//           { username: "خالد", text: "مفيد جداً" },
//         ],
//       },
//     ]);
//   }, []);

//   const [shownComments, setShownComments] = useState({});

//   const toggleComments = (postId) => {
//     setShownComments((prev) => ({
//       ...prev,
//       [postId]: !prev[postId],
//     }));
//   };

//   const handleLike = (postId) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? { ...post, likesCount: post.likesCount + 1 }
//           : post
//       )
//     );
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString("ar-EG", {
//       weekday: "short",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div
//       className="container py-4 d-flex flex-column align-items-center"
//       style={{ direction: "rtl" }}
//     >
//       {posts.map((post) => (
//         <div
//           key={post.id}
//           className="card mb-4 p-3 w-100 shadow"
//           style={{
//             maxWidth: window.innerWidth >= 992 ? "800px" : "600px",
//             textAlign: "right",
//           }}
//         >
//           {/* معلومات الدكتور */}
//           <div className="d-flex align-items-center justify-content-end mb-3">
//             <div className="ms-2">
//               <strong>{post.doctorName}</strong>
//               <div className="text-muted small">
//                 {formatDate(post.createdAt)}
//               </div>
//             </div>
//             <img
//               src={post.doctorImage}
//               alt="دكتور"
//               className="rounded-circle"
//               width="50"
//               height="50"
//             />
//           </div>

//           {/* نص وصورة البوست */}
//           {post.text && <p className="mb-2">{post.text}</p>}
//           {post.image && (
//             <img
//               src={post.image}
//               alt="محتوى"
//               className="img-fluid rounded mb-3"
//             />
//           )}

//           {/* أزرار التفاعل */}
//           <div className="d-flex justify-content-end gap-4 text-muted fs-6 mb-2">
//             <div
//               className="d-flex align-items-center"
//               style={{ cursor: "pointer" }}
//               onClick={() => handleLike(post.id)}
//             >
//               <FaHeart className="ms-1 text-danger" /> {post.likesCount}
//             </div>
//             <div
//               className="d-flex align-items-center"
//               style={{ cursor: "pointer" }}
//               onClick={() => toggleComments(post.id)}
//             >
//               <FaComment className="ms-1 text-primary" /> {post.comments.length}
//             </div>
//           </div>

//           {/* التعليقات */}
//           {shownComments[post.id] && (
//             <div className="bg-light p-2 rounded">
//               <h6 className="mb-2">💬 التعليقات:</h6>
//               {post.comments.map((comment, index) => (
//                 <div key={index} className="border-bottom pb-1 mb-1">
//                   <strong>{comment.username}:</strong> {comment.text}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;

