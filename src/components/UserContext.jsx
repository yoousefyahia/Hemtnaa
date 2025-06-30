import React, { createContext, useContext, useState } from 'react';
import profileHeader from '../assets/Ellipse 8.png';
import axios from 'axios';

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

  const updateUser = async (newData) => {
    try {
      // Assume user._id exists
      const userId = user._id;
      if (!userId) throw new Error('User ID is missing');
      const response = await axios.put(`https://hemtna.onrender.com/api/users/${userId}`, newData);
      setUser(prev => ({ ...prev, ...response.data }));
      return { success: true };
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return { success: false, error };
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 