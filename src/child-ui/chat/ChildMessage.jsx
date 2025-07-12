import React from 'react';
import { FaPaperclip } from 'react-icons/fa';

const ChildMessage = React.memo(({ msg, index }) => {
  const isMe = msg.sender === 'me';
  const wrapperClass = isMe ? 'message-wrapper-me' : 'message-wrapper-doctor';
  const senderClass = isMe ? 'message-sender-me' : 'message-sender-doctor';
  const timeClass = isMe ? 'message-time-me' : 'message-time-doctor';
  const bubbleClass = isMe ? 'message-bubble-me' : 'message-bubble-doctor';

  // Image Message
  if (msg.image && !msg.text) {
    return (
      <div key={index} className={`message-wrapper ${wrapperClass}`}>
        <div className={`message-sender ${senderClass}`}>{msg.name}</div>
        <img src={msg.image} alt="صورة مرسلة" className="message-image" />
        <div className={`message-time ${timeClass}`}>{msg.time}</div>
      </div>
    );
  }
  
  // File Message
  if (msg.file && !msg.text) {
    return (
      <div key={index} className={`message-wrapper ${wrapperClass}`}>
        <div className={`message-sender ${senderClass}`}>{msg.name}</div>
        <a href={msg.file.url} download={msg.file.name} target="_blank" rel="noopener noreferrer" className="message-file">
          <FaPaperclip style={{ fontSize: 20, color: '#2563eb' }} />
          <span className="message-file-name">{msg.file.name}</span>
        </a>
        <div className={`message-time ${timeClass}`}>{msg.time}</div>
      </div>
    );
  }

  // Audio Message
  if (msg.audio && !msg.text) {
    return (
      <div key={index} className={`message-wrapper ${wrapperClass}`}>
        <div className={`message-sender ${senderClass}`}>{msg.name}</div>
        <audio controls src={msg.audio} className="message-audio" />
        <div className={`message-time ${timeClass}`}>{msg.time}</div>
      </div>
    );
  }

  // Text Message (or mixed)
  return (
    <div key={index} className={`message-wrapper ${wrapperClass}`}>
      <div className={`message-sender ${senderClass}`}>{msg.name}</div>
      <div className={`message-bubble ${bubbleClass}`}>
        {msg.text && <span>{msg.text}</span>}
        {msg.audio && <audio controls src={msg.audio} style={{ display: 'block', marginTop: 8, width: '100%' }} />}
        <div className={`message-time ${timeClass}`}>{msg.time}</div>
      </div>
    </div>
  );
});

export default ChildMessage; 