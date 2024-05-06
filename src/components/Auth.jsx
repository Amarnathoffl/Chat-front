import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ChatPage from './ChatPage';

function Auth() {
  const user = useLocation().state;

  
  const storedUsername = localStorage.getItem('username');
  if (!storedUsername) {
    alert('Please enter your username to access the chat!');
    return <Navigate to='/' />;
  }

  return <ChatPage />;
}

export default Auth;
