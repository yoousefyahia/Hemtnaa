import React, { createContext, useContext, useState } from 'react';
import profileHeader from '../../assets/Ellipse 8.png';
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
  const [user, setUserState] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : defaultProfile;
  });

  // setUser wrapper to always update localStorage
  const setUser = (newUser) => {
    setUserState(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const updateUser = async (newData) => {
    try {
      // دعم _id أو id
      const userId = user._id || user.id;
      if (!userId) {
        return { success: false, error: 'يجب تسجيل الدخول أولاً' };
      }
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://hemtna.onrender.com/api/users/${userId}`,
        newData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Updated user from server:', response.data);
      setUser({ ...user, ...response.data });
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