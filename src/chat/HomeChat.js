import React, { useState, useRef, useEffect } from 'react';
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { 
  FaPhone, 
  FaVideo, 
  FaPaperclip, 
  FaMicrophone, 
  FaSmile, 
  FaPaperPlane, 
  FaTimes, 
  FaFile, 
  FaImage, 
  FaPlay, 
  FaPause,
  FaArrowRight,
  FaGraduationCap,
  FaStop
} from 'react-icons/fa';
import './HomeChat.css';
import DialogRating from '../Rinning/DialogRating';

const HomeChat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [profileUser, setProfileUser] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const localStreamRef = useRef(null);
  const callTimerRef = useRef(null);
  const dialogRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Sample users data
  const users = [
    { id: 1, name: 'أحمد', age: 8, illness: 'حساسية صدر', year: 3, phone: '01000000001', avatar: 'https://i.pravatar.cc/150?img=1', status: 'متصل الآن' },
    { id: 2, name: 'سارة', age: 7, illness: 'سكري', year: 2, phone: '01000000002', avatar: 'https://i.pravatar.cc/150?img=2', status: 'آخر ظهور منذ 5 دقائق' },
    { id: 3, name: 'محمد', age: 7, illness: 'سكري', year: 2, phone: '01000000002', avatar: 'https://i.pravatar.cc/150?img=3', status: 'متصل الآن' },
    { id: 4, name: 'فاطمة', age: 7, illness: 'سكري', year: 2, phone: '01000000002', avatar: 'https://i.pravatar.cc/150?img=4', status: 'آخر ظهور منذ ساعة' },
    { id: 5, name: 'علي', age: 7, illness: 'سكري', year: 2, phone: '01000000002', avatar: 'https://i.pravatar.cc/150?img=5', status: 'متصل الآن' },
    { id: 6, name: 'نور', age: 7, illness: 'سكري', year: 2, phone: '01000000002', avatar: 'https://i.pravatar.cc/150?img=6', status: 'آخر ظهور منذ 3 دقائق' },
  ];

  // Sample initial messages
  const initialMessages = [
    {
      id: 1,
      text: 'مرحباً! كيف حالك اليوم؟',
      sender: 'other',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      text: 'الحمد لله، أنا بخير. وأنت؟',
      sender: 'me',
      timestamp: '10:31 AM',
      type: 'text'
    },
    {
      id: 3,
      text: 'أنا أيضاً بخير. هل تريد أن نبدأ الدرس؟',
      sender: 'other',
      timestamp: '10:32 AM',
      type: 'text'
    }
  ];

  useEffect(() => {
    if (selectedUser) {
      setMessages(initialMessages);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowEmojiPicker(false);
    setShowFileMenu(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString(),
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      // Request microphone permission with optimal settings
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 48000,
          sampleSize: 16
        } 
      });

      // Create MediaRecorder with optimal settings
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000,
        bitsPerSecond: 128000
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Handle data available event
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      mediaRecorder.onstop = async () => {
        try {
          if (audioChunksRef.current.length === 0) {
            throw new Error('No audio data recorded');
          }

          const audioBlob = new Blob(audioChunksRef.current, { 
            type: 'audio/webm;codecs=opus' 
          });

          // Create a temporary audio element to validate the recording
          const audio = new Audio();
          audio.src = URL.createObjectURL(audioBlob);
          
          // Wait for audio to be loaded
          await new Promise((resolve, reject) => {
            audio.onloadedmetadata = resolve;
            audio.onerror = reject;
          });

          const newMessage = {
            id: Date.now(),
            sender: 'me',
            audioUrl: audio.src,
            timestamp: new Date().toLocaleTimeString(),
            type: 'audio',
            duration: recordingTime
          };
          
          setMessages(prevMessages => [...prevMessages, newMessage]);
        } catch (error) {
          console.error('Error processing audio:', error);
          alert('حدث خطأ في معالجة التسجيل الصوتي. يرجى المحاولة مرة أخرى.');
        } finally {
          // Cleanup
          setRecordingTime(0);
          audioChunksRef.current = [];
        }
      };

      // Handle errors during recording
      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        stopRecording();
        alert('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
      };

      // Start recording with smaller chunks for better quality
      mediaRecorder.start(50);
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('حدث خطأ في بدء التسجيل. يرجى التحقق من صلاحيات الميكروفون.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current && isRecording) {
        // Stop the recording
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
        
        // Stop all tracks
        if (mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => {
            track.stop();
            track.enabled = false;
          });
        }

        // Clear timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        // Reset states
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      // Force reset states even if there's an error
      setIsRecording(false);
      setRecordingTime(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        stopRecording();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatRecordingTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newMessage = {
        id: Date.now(),
        file: file,
        fileName: file.name,
        fileType: file.type,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString(),
        type: 'file'
      };
      setMessages([...messages, newMessage]);
    }
  };

  const formatCallDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCall = async (type) => {
    try {
      const constraints = {
        audio: true,
        video: type === 'video'
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStreamRef.current = stream;
      setIsCallActive(true);
      setIsMuted(false);
      setIsCameraOff(false);
      setCallDuration(0);

      // Start call timer
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting call:', error);
      alert('حدث خطأ في بدء المكالمة. يرجى التحقق من صلاحيات الميكروفون والكاميرا.');
    }
  };

  const endCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        track.stop();
        track.enabled = false;
      });
    }
    clearInterval(callTimerRef.current);
    setIsCallActive(false);
    setIsMuted(false);
    setIsCameraOff(false);
    setCallDuration(0);
    localStreamRef.current = null;
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!isMuted);
      }
    }
  };

  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOff(!isCameraOff);
      }
    }
  };

  const renderMessage = (msg) => {
    switch (msg.type) {
      case 'text':
        return (
          <div className="message-content">
            <p>{msg.text}</p>
            <span className="message-time">{msg.timestamp}</span>
          </div>
        );
      case 'file':
        return (
          <div className="message-content file-message">
            <div className="file-preview">
              {msg.fileType.startsWith('image/') ? (
                <img src={URL.createObjectURL(msg.file)} alt="Shared file" />
              ) : (
                <FaFile className="file-icon" />
              )}
            </div>
            <div className="file-info">
              <p className="file-name">{msg.fileName}</p>
              <span className="message-time">{msg.timestamp}</span>
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="message-content">
            <audio controls src={msg.audioUrl} />
            <span className="message-time">{msg.timestamp}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-chat-container">
      {!selectedUser ? (
        <div className="users-grid">
          {users.map((user) => (
            <div
              key={user.id}
              className="user-card"
              onClick={() => handleUserClick(user)}
            >
              <div className="user-avatar-container">
                <img src={user.avatar} alt={user.name} className="user-avatar" />
                <span className={`status-indicator ${user.status.includes('متصل') ? 'online' : ''}`}></span>
              </div>
              <h3>{user.name}</h3>
              <p className="user-status">{user.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <button className="back-button" onClick={() => setSelectedUser(null)}>
              <FaArrowRight />
            </button>
            
            <div className="user-info" onClick={() => setProfileUser(selectedUser)}>
              <img src={selectedUser.avatar} alt={selectedUser.name} className="chat-avatar" />
              <div className="user-details">
                <h3>{selectedUser.name}</h3>
                <p className="user-status">{selectedUser.status}</p>
              </div>
            </div>

            <div className="call-buttons">
              <button className="call-btn" onClick={() => handleCall('voice')}>
                <IoCallOutline />
              </button>
              <button className="video-btn" onClick={() => handleCall('video')}>
                <CiVideoOn/>
              </button>
            </div>
          </div>

          <div className="messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}
              >
                {renderMessage(msg)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="message-input">
            <div className="input-buttons">
              <button 
                className="attach-btn"
                onClick={() => setShowFileMenu(!showFileMenu)}
              >
                <FaPaperclip />
              </button>
              {showFileMenu && (
                <div className="file-menu">
                  <label className="file-option">
                    <FaImage />
                    <span>صورة</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                    />
                  </label>  
                </div>
              )}
              <button 
                className={`voice-btn ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
                title={isRecording ? "إيقاف التسجيل" : "بدء التسجيل"}
                disabled={!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
                {isRecording && (
                  <div className="recording-indicator">
                    <span className="recording-dot"></span>
                    <span className="recording-timer">{formatRecordingTime(recordingTime)}</span>
                  </div>
                )}
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالة..."
            />
            <div className="input-buttons">
        
        <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!message.trim()}
        >
                <FaPaperPlane />
        </button>
      </div>
          </div>

          {isCallActive && (
            <div className="call-overlay">
              <div className="call-info">
                <div className="call-duration">{formatCallDuration(callDuration)}</div>
                <div className="call-status">مكالمة {localStreamRef.current?.getVideoTracks().length > 0 ? 'فيديو' : 'صوتية'}</div>
              </div>
              <div className="call-controls">
                <button className="end-call-btn" onClick={endCall}>
                  <FaPhone />
                </button>
                <button 
                  className={`toggle-mic-btn ${isMuted ? 'active' : ''}`} 
                  onClick={toggleMute}
                >
                  <FaMicrophone />
                </button>
                {localStreamRef.current?.getVideoTracks().length > 0 && (
                  <button 
                    className={`toggle-video-btn ${isCameraOff ? 'active' : ''}`} 
                    onClick={toggleCamera}
                  >
                    <FaVideo />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {profileUser && (
        <div className="profile-dialog-overlay" onClick={() => setProfileUser(null)}>
          <div className="profile-dialog" onClick={e => e.stopPropagation()}>
            <button className="close-btn close" onClick={() => setProfileUser(null)}>✕</button>
            <div className="profile-header">
              <img src={profileUser.avatar} alt={profileUser.name} className="profile-avatar" />
              <h2>{profileUser.name}</h2>
              
            </div>
            <div className="profile-details">
              {profileUser.age && <p><b>السن:</b> {profileUser.age} سنوات</p>}
              {profileUser.illness && <p><b>الحالة المرضية:</b> {profileUser.illness}</p>}
              {profileUser.year && <p><b>المستوى الدراسي:</b> {profileUser.year}</p>}
              {profileUser.phone && <p><b>رقم الهاتف:</b> {profileUser.phone}</p>}
            </div>
            <DialogRating/>      
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeChat;
