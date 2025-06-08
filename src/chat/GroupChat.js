import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaVideo, FaPaperclip, FaPaperPlane, FaImage, FaFile, FaArrowRight, FaStop, FaMicrophoneSlash, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import './GroupChat.css';
import { CiVideoOn } from 'react-icons/ci';
import { IoCallOutline } from 'react-icons/io5';


const sampleMessages = [
  {
    id: 1,
    userId: 1,
    text: 'مرحباً بالجميع! كيف حالكم اليوم؟',
    timestamp: '10:00 AM',
    type: 'text',
  },
  {
    id: 2,
    userId: 2,
    text: 'أنا بخير، شكراً! ماذا عنك يا أحمد؟',
    timestamp: '10:01 AM',
    type: 'text',
  },
  {
    id: 3,
    userId: 3,
    text: 'أنا متحمس لدرس اليوم!',
    timestamp: '10:02 AM',
    type: 'text',
  },
];

const GroupChat = ({ group, onBack }) => {
  const [messages, setMessages] = useState(sampleMessages);
  const [message, setMessage] = useState('');
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const callTimerRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup function for call
  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (remoteStreamRef.current) {
        remoteStreamRef.current.getTracks().forEach(track => track.stop());
      }
      clearInterval(callTimerRef.current);
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        userId: group.members[0].id, // Simulate current user as first member
        text: message,
        timestamp: new Date().toLocaleTimeString(),
        type: 'text',
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newMessage = {
        id: Date.now(),
        userId: group.members[0].id, // Simulate current user
        file: file,
        fileName: file.name,
        fileType: file.type,
        timestamp: new Date().toLocaleTimeString(),
        type: 'file',
      };
      setMessages([...messages, newMessage]);
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
            userId: group.members[0].id,
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

  const formatCallDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startCall = async (isVideo = false) => {
    try {
      const constraints = {
        audio: true,
        video: isVideo
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStreamRef.current = stream;

      if (isVideo) {
        setIsVideoActive(true);
      } else {
        setIsCallActive(true);
      }

      // Reset states
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
    try {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
      }
      if (remoteStreamRef.current) {
        remoteStreamRef.current.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
      }
      
      clearInterval(callTimerRef.current);
      setIsCallActive(false);
      setIsVideoActive(false);
      setCallDuration(0);
      setIsMuted(false);
      setIsCameraOff(false);
      
      // Reset streams
      localStreamRef.current = null;
      remoteStreamRef.current = null;
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  const toggleMute = () => {
    try {
      if (localStreamRef.current) {
        const audioTrack = localStreamRef.current.getAudioTracks()[0];
        if (audioTrack) {
          audioTrack.enabled = !audioTrack.enabled;
          setIsMuted(!isMuted);
        }
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const toggleCamera = () => {
    try {
      if (localStreamRef.current) {
        const videoTrack = localStreamRef.current.getVideoTracks()[0];
        if (videoTrack) {
          videoTrack.enabled = !videoTrack.enabled;
          setIsCameraOff(!isCameraOff);
        }
      }
    } catch (error) {
      console.error('Error toggling camera:', error);
    }
  };

  const renderMessage = (msg) => {
    const user = group.members.find((m) => m.id === msg.userId);
    return (
      <div className={`group-message ${msg.userId === group.members[0].id ? 'sent' : 'received'}`}>
        <img src={user?.avatar} alt={user?.name} className="group-message-avatar" />
        <div className="group-message-content">
          <div className="group-message-name">
            <span className="group-message-name">{user?.name}</span>
          </div>
          {msg.type === 'text' && <p>{msg.text}</p>}
          {msg.type === 'file' && (
            <div className="file-message">
              <div className="file-preview">
                {msg.fileType && msg.fileType.startsWith('image/') ? (
                  <img src={URL.createObjectURL(msg.file)} alt="Shared file" />
                ) : (
                  <FaFile className="file-icon" />
                )}
              </div>
              <div className="file-info">
                <p className="file-name">{msg.fileName}</p>
              </div>
            </div>
          )}
          {msg.type === 'audio' && (
            <div className="audio-message">
              <audio controls src={msg.audioUrl} />
              <span className="audio-duration">{formatRecordingTime(msg.duration)}</span>
            </div>
          )}
          <div className="group-message-footer">
            <span className="group-message-time">{msg.timestamp}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="group-chat-window">
      <div className="group-chat-header">
        <button className="back-btn" onClick={onBack} title="رجوع">
          <FaArrowRight />
        </button>
        <img src={group.image} alt={group.name} className="group-chat-avatar" />
        <div className="group-chat-title">{group.name}</div>
        <div className="group-chat-actions">
          <button 
            className={`call-btn ${isCallActive ? 'active' : ''}`} 
            onClick={() => isCallActive ? endCall() : startCall(false)}
            title={isCallActive ? "إنهاء المكالمة" : "بدء مكالمة صوتية"}
          >
            <IoCallOutline />
            {isCallActive && <span className="call-timer">{formatCallDuration(callDuration)}</span>}
          </button>
          <button 
            className={`video-btn ${isVideoActive ? 'active' : ''}`}
            onClick={() => isVideoActive ? endCall() : startCall(true)}
            title={isVideoActive ? "إنهاء مكالمة الفيديو" : "بدء مكالمة فيديو"}
          >
            <CiVideoOn/>
            {isVideoActive && <span className="call-timer">{formatCallDuration(callDuration)}</span>}
          </button>
        </div>
      </div>

      {(isCallActive || isVideoActive) && (
        <div className="call-overlay">
          <div className="call-info">
            <div className="call-duration">{formatCallDuration(callDuration)}</div>
            <div className="call-status">مكالمة {isVideoActive ? 'فيديو' : 'صوتية'}</div>
          </div>
          <div className="call-controls">
            <button 
              className="control-btn end-call"
              onClick={endCall}
              title="إنهاء المكالمة"
            >
              <FaPhoneSlash />
            </button>
            <button 
              className={`control-btn ${isMuted ? 'active' : ''}`}
              onClick={toggleMute}
              title={isMuted ? "تشغيل الميكروفون" : "إيقاف الميكروفون"}
            >
              {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
            {isVideoActive && (
              <button 
                className={`control-btn ${isCameraOff ? 'active' : ''}`}
                onClick={toggleCamera}
                title={isCameraOff ? "تشغيل الكاميرا" : "إيقاف الكاميرا"}
              >
                {isCameraOff ? <FaVideoSlash /> : <FaVideo />}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="group-messages-container">
        {messages.map((msg) => (
          <div key={msg.id}>{renderMessage(msg)}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>


      <div className="group-message-input">
        <div className="input-buttons">
          <button className="attach-btn" onClick={() => setShowFileMenu(!showFileMenu)}><FaPaperclip /></button>
          {showFileMenu && (
            <div className="file-menu">
              <label className="file-option">
                <FaImage />
                <span>صورة</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
              <label className="file-option">
                <FaFile />
                <span>ملف</span>
                <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
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
          placeholder="اكتب رسالة للمجموعة..."
        />
        <button className="send-btn" onClick={handleSendMessage} disabled={!message.trim()}><FaPaperPlane /></button>
      </div>
    </div>
  );
};

export default GroupChat;
