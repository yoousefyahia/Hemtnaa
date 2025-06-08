// import React from 'react';
// import './ChatList.css';

// const ChatList = () => {
//   // Sample data - replace with your actual data source
//   const messages = [
//     { id: 1, sender: 'Amir ali', timestamp: '01 oct 2023 - 12:30 pm', status: 'تحديث' },
//     { id: 2, sender: 'Amir ali', timestamp: '01 oct 2023 - 12:30 pm', status: 'تحديث' },
//     { id: 3, sender: 'Amir ali', timestamp: '01 oct 2023 - 12:30 pm', status: 'تحديث' },
//     // Add more messages as needed
//   ];

//   return (
//     <div className="chat-container">
//       <div className="chat-list">
//         {messages.map((message) => (
//           <div key={message.id} className="chat-item">
//             <div className="user-avatar">
//               <img src="/path-to-avatar.jpg" alt={message.sender} />
//             </div>
//             <div className="message-info">
//               <h3 className="sender-name">{message.sender}</h3>
//               <span className="timestamp">{message.timestamp}</span>
//             </div>
//             <div className="message-status">
//               <span className="status-text">{message.status}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatList; 