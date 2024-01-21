"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { register } from '@/lib/actions';
import { useRouter } from 'next/router';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    // Make a POST request to your API route
    console.log("Called")
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);

    } else {
      const errorData = await response.json();
      console.error('Registration failed:', errorData.message);
    }
  };

  return (
    <div className='m-10 p-10 border border-grey-200 rounded-md max-w-md mx-auto'>
      <h2 className='text-2xl font-semibold mb-6'>Register</h2>
      <form>
        <label className='block mb-4'>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full border border-gray-300 p-2 rounded-md outline-none'
          />
        </label>
        
        <label className='block mb-4'>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full border border-gray-300 p-2 rounded-md outline-none'
          />
        </label>
        
        <Button variant="outline" className='py-2 px-4 bg-blue-500 text-white rounded-md' onClick={handleRegister}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Login;
