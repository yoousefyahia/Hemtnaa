import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import io from 'socket.io-client';
import { FaSmile, FaPaperclip } from 'react-icons/fa';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import './styles/ChildDoctorChat.sass';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoctorProfileModal from './ChildDoctorProfileModal';
import ChildMessage from './ChildMessage';
import userImg from "../../assets/user.png";

const socket = io(""); 

const DoctorChat = ({ 
  doctor = { 
    name: "د. أحمد محمود", 
    image: userImg ,
    lastSeen: "نشط الآن",
    specialty: "أخصائي التخاطب والسمعيات",
    age: 34,
    experience: 8,
    bio: "متخصص في تشخيص وعلاج اضطرابات اللغة والنطق لدى الأطفال والبالغين، مع التركيز على برامج التدخل المبكر وتحسين المهارات التواصلية."
  }, 
  userId = "user1", 
  roomId = "room1" 
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordingText, setRecordingText] = useState('');
  const [callOverlay, setCallOverlay] = useState(false);
  const [callType, setCallType] = useState(null); 
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnectionRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [callTimer, setCallTimer] = useState(0);
  const callTimerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  
  // Memoized doctor info
  const doctorInfo = useMemo(() => ({
    name: doctor.name,
    image: doctor.image,
    lastSeen: doctor.lastSeen,
    specialty: doctor.specialty,
    age: doctor.age,
    experience: doctor.experience,
    bio: doctor.bio
  }), [doctor]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      const now = new Date();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          text: data,
          name: doctor.name,
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    });
    socket.on("receive-audio", (audioData) => {
      const now = new Date();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          audio: audioData,
          name: doctor.name,
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    });
    return () => socket.disconnect();
  }, []);

  const handleSend = useCallback(() => {
    if (message.trim()) {
      const now = new Date();
      socket.emit("send-message", message);
      setMessages(prev => [
        ...prev,
        {
          sender: 'me',
          text: message,
          name: 'أنت',
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMessage('');
    }
  }, [message]);

  const handleEmojiClick = useCallback((emojiData, event) => {
    // دعم جميع أشكال البيانات
    console.log('emojiData:', emojiData);
    if (emojiData.emoji) {
      setMessage((prev) => prev + emojiData.emoji);
    } else if (emojiData.native) {
      setMessage((prev) => prev + emojiData.native);
    } else if (typeof emojiData === 'string') {
      setMessage((prev) => prev + emojiData);
    }
    // إغلاق الإيموجن بعد الاختيار
  }, []);

  const handleMicClick = async () => {
    if (!recording) {
      // Start recording
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        setRecording(true);
        setRecordingText('يتم التسجيل...');
        setAudioChunks([]);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new window.MediaRecorder(stream);
        let localChunks = [];
        recorder.ondataavailable = (e) => {
          localChunks.push(e.data);
        };
        recorder.onstop = () => {
          const audioBlob = new Blob(localChunks, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Audio = reader.result;
            const now = new Date();
            socket.emit("send-audio", base64Audio);
            setMessages((prev) => [...prev, { sender: 'me', audio: base64Audio, time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
          };
          reader.readAsDataURL(audioBlob);
          setRecording(false);
          setRecordingText('');
        };
        setMediaRecorder(recorder);
        recorder.start();
      } else {
        toast.error('المتصفح لا يدعم التسجيل الصوتي');
      }
    } else {
      // Stop recording
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    }
  };

  // بدء المكالمة
  const startCall = async (type) => {
    setCallType(type);
    setCallOverlay(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video',
      });
      setLocalStream(stream);
      // سيتم إضافة منطق WebRTC لاحقًا
    } catch (err) {
      toast.error('حدث خطأ أثناء محاولة بدء المكالمة: ' + err.message);
      setCallOverlay(false);
      setCallType(null);
    }
  };

  // WebRTC إعداد
  useEffect(() => {
    if (!callOverlay) return;
    if (!localStream) return;

    // إعداد PeerConnection
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
      ],
    });
    peerConnectionRef.current = pc;

    // أضف المسارات المحلية
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

    // استقبال مسارات الطرف الآخر
    pc.ontrack = (event) => {
      const [stream] = event.streams;
      setRemoteStream(stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    // إرسال بيانات ICE
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { candidate: event.candidate, roomId });
      }
    };

    // استقبال بيانات الإشارة
    socket.on('offer', async (data) => {
      if (data.roomId !== roomId) return;
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer', { answer, roomId });
    });

    socket.on('answer', async (data) => {
      if (data.roomId !== roomId) return;
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    });

    socket.on('ice-candidate', async (data) => {
      if (data.roomId !== roomId) return;
      try {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (e) { /* ignore */ }
    });

    // إذا كان المستخدم هو البادئ
    if (callType && callOverlay && localStream) {
      (async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { offer, roomId });
      })();
    }

    return () => {
      pc.close();
      peerConnectionRef.current = null;
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
    };
  }, [callOverlay, localStream, callType, roomId]);

  // إنهاء المكالمة
  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setCallOverlay(false);
    setCallType(null);
    setLocalStream(null);
    setRemoteStream(null);
  };

  // Call timer logic
  useEffect(() => {
    if (callOverlay) {
      setCallTimer(0);
      callTimerRef.current = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(callTimerRef.current);
    }
    return () => clearInterval(callTimerRef.current);
  }, [callOverlay]);

  // Toggle mute
  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
      });
    }
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
        setVideoEnabled(track.enabled);
      });
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const isImage = file.type.startsWith('image/');
      
      reader.onloadend = () => {
        const now = new Date();
        const messageData = {
          sender: 'me',
          name: 'أنت',
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        if (isImage) {
          messageData.image = reader.result;
        } else {
          messageData.file = {
            name: file.name,
            url: reader.result,
            type: file.type
          };
        }
        setMessages(prev => [...prev, messageData]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="doctor-chat-container">
        <div className="chat-header-custom">
          <div className="header-actions">
            <button onClick={() => startCall('video')} className="icon-btn" title="مكالمة فيديو">
              <Video size={22} color="#3b82f6" />
            </button>
            <button onClick={() => startCall('audio')} className="icon-btn" title="مكالمة صوتية">
              <Phone size={22} color="#3b82f6" />
            </button>
          </div>
          <div 
            className="doctor-info-custom" 
            onClick={() => setProfileModalOpen(true)}
            style={{ cursor: 'pointer' }}
            title="عرض ملف الدكتور"
          >
            <div className="doctor-details">
              <div className="doctor-name">{doctor.name}</div>
              <div className="doctor-status">{doctor.lastSeen}</div>
            </div>
            <img src={doctor.image} alt="doctor" className="doctor-avatar-custom" />
          </div>
        </div>

        {callOverlay && (
          <div className="call-overlay">
            <div className="call-info">
              <div className="call-timer">
                {String(Math.floor(callTimer / 60)).padStart(2, '0')}:{String(callTimer % 60).padStart(2, '0')}
              </div>
              <div className="call-type">{callType} call</div>
            </div>

            <div className="call-view">
              {callType === 'video' && localStream && (
                <div className="video-container">
                  <video
                    autoPlay
                    muted
                    playsInline
                    ref={video => { if (video) video.srcObject = localStream; }}
                    className="local-video"
                  />
                  {remoteStream && (
                    <video
                      autoPlay
                      playsInline
                      ref={remoteVideoRef}
                      className="remote-video"
                    />
                  )}
                </div>
              )}
              {callType === 'audio' && remoteStream && (
                <audio autoPlay ref={audio => { if (audio) audio.srcObject = remoteStream; }} />
              )}
            </div>

            <div className="call-controls">
              <button onClick={endCall} className="call-btn end-call-btn" title="إنهاء المكالمة">
                <PhoneOff size={28} color="#fff" />
              </button>
              <button onClick={toggleMute} className="call-btn mute-btn" title={isMuted ? 'تشغيل المايك' : 'كتم المايك'}>
                {isMuted ? <MicOff size={24} color="#fff" /> : <Mic size={24} color="#fff" />}
              </button>
              {callType === 'video' && (
                <button onClick={toggleVideo} className="call-btn video-btn" title={videoEnabled ? 'إيقاف الفيديو' : 'تشغيل الفيديو'}>
                  {videoEnabled ? <Video size={24} color="#fff" /> : <VideoOff size={24} color="#fff" />}
                </button>
              )}
            </div>
          </div>
        )}

        <div className="chat-body">
          {messages.map((msg, index) => (
            <ChildMessage key={index} msg={msg} index={index} />
          ))}
          {recording && (
            <div className="recording-indicator">{recordingText}</div>
          )}
        </div>

        <div className="chat-footer" style={{position: 'relative'}}>
          <button
            type="button"
            className="footer-icon-btn"
            title="إضافة إيموجي"
            onClick={() => setShowEmoji((prev) => !prev)}
            style={{ position: "relative" }}
          >
            <span style={{ fontSize: 22 }}>😊</span>
          </button>
          {showEmoji && (
            <div
              style={{
                position: "absolute",
                bottom: "50px",
                right: "0",
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                padding: "10px",
                zIndex: 1000,
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                width: "220px"
              }}
            >
              {["😀", "😂", "😍", "🥰", "😎", "😭", "😡", "👍", "🙏", "🎉", "❤️", "😅", "😇", "😜", "🤔", "😢", "😱", "😏", "😬", "😴"].map((emoji) => (
                <span
                  key={emoji}
                  style={{ fontSize: 24, cursor: "pointer" }}
                  onClick={() => {
                    setMessage((prev) => prev + emoji);
                    setShowEmoji(false);
                  }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}
          <input
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && message.trim() && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            dir="rtl"
            style={{ textAlign: 'right' }}
          />
          <button className="send-btn" onClick={handleSend}>
            إرسال
          </button>
          <button className={`footer-icon-btn mic-btn${recording ? ' recording' : ''}`} onClick={handleMicClick} title="تسجيل صوتي">
            <Mic size={22} />
          </button>
          <button onClick={handleFileClick} className="footer-icon-btn" title="إرفاق ملف">
            <FaPaperclip size={22} />
          </button>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        </div>

        <ToastContainer position="top-center" rtl />
      </div>
      
      {isProfileModalOpen && (
        <DoctorProfileModal 
          doctor={doctor}
          onClose={() => setProfileModalOpen(false)}
        />
      )}
    </>
  );
};

export default React.memo(DoctorChat);
