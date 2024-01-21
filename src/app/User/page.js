"use client"
import React, { useContext } from 'react'
import { AuthProvider, useAuth } from '@/components/AuthContext';
import UserDashboard from '@/components/UserDashboard';
const User = () => {
const   { user } = useAuth();
console.log(user)
if (!user) {
    // Redirect or show a login component if the user is not logged in
    return <p>Please log in to access this page.</p>;
  }
else{
  return (
    <UserDashboard/>
  );
}
}
export default User;