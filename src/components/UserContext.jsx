import React, { createContext, useContext, useState } from 'react';
import profileHeader from '../assets/Ellipse 8.png';

const defaultProfile = {
  firstName: "يوسف",
  lastName: "السيد",
  email: "amrhemdan563@gmail.com",
  password: "0000000",
  country: "مصر",
  phone: "+201078544486",
  education: "حضانه",
  experience: "5 سنوات",
  birthDate: "2010-01-01",
  profileImage: profileHeader,
  joinDate: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
  lastActivity: "الآن",
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultProfile);

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 