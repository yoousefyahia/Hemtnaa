import React, { useState } from 'react';
import './Chat.css';
import HomeChat from './HomeChat';
import GroupChat from './GroupChat';
import brain from './brain (2).png';
import صعوبة from './صعوب(3).png';
import brain1 from './brain (1).png';

const groups = [
  {
    id: 1,
    name: 'مجموعة السمع',
    type: 'سمع',
    image: brain,
    members: [
      { id: 1, name: 'أحمد', age: 7, illness: 'توحد', phone: '01000000001', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'سارة', age: 8, illness: 'ADHD', phone: '01000000002', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 3, name: 'محمد', avatar: 'https://i.pravatar.cc/150?img=3' },
    ],
  },
  {
    id: 2,
    name: 'مجموعة السلوكيات',
    type: 'سلوكيات',
    image: صعوبة,
    members: [
      { id: 4, name: 'فاطمة', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: 5, name: 'علي', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 6, name: 'نور', avatar: 'https://i.pravatar.cc/150?img=6' },
    ],
  },
  {
    id: 3,
    name: 'مجموعة صعوبة التعلم',
    type: 'صعوبة تعلم',
    image: brain1,
    members: [
      { id: 7, name: 'مريم', avatar: 'https://i.pravatar.cc/150?img=7' },
      { id: 8, name: 'يوسف', avatar: 'https://i.pravatar.cc/150?img=8' },
      { id: 9, name: 'ليلى', avatar: 'https://i.pravatar.cc/150?img=9' },
    ],
  },
];

const Chat = () => {
  const [activeView, setActiveView] = useState('list');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [profileDialogUser, setProfileDialogUser] = useState(null);

  return (
    <div className="chat-container-main">
      <div className="rating-tabs">
        <button 
          className={`buttomst  ${activeView === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveView('stats')}
        >
           المجموعه
        </button>
        <button 
          className={`buttomst ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => { setActiveView('list'); setSelectedGroup(null); }}
        >
          الدردشة
        </button>
      </div>
      {activeView === 'list' ? (
        <div className='chat-container'>
          <HomeChat/>
        </div>
      ) : (
        <div className='chat-container'>
          {!selectedGroup ? (
            <div className="user-grid">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="user-grid-item"
                  onClick={() => setSelectedGroup(group)}
                >
                  <img src={group.image} alt={group.name} className="user-grid-avatar" />
                  <div className="user-grid-name">{group.name}</div>
                </div>
              ))}
            </div>
          ) : (
            <GroupChat group={selectedGroup} onBack={() => setSelectedGroup(null)} />
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;