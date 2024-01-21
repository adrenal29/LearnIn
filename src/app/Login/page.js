"use client"
import { useState,useContext,useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import Link from 'next/link';
import {useAuth} from '@/components/AuthContext'
import { useRouter } from 'next/navigation';
import UserDashboard from '@/components/UserDashboard';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();
  const router=useRouter();
  const [user,setUser]=useState(null);
  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    let userName= localStorage.getItem('user');
    setUser(userName)
  }, []);

  const handleRegister = async (e) => {
    // Make a POST request to your API route
    e.preventDefault();
    console.log("Called")
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (response) {
      const data = await response.json();
      console.log(data?.user?.username);
      login(data?.user?.username);
      localStorage.setItem('user',data?.user?.username)
      router.push('/User')
    } else {
      const errorData = await response.json();
      console.error('Registration failed:', errorData.message);
    }
  };

  const testLogin=()=>{
    setUsername('t2@gmail.com')
    setPassword('123')
  }
  if(user==null){
  return (
   
    <div className='m-10 p-10 border border-grey-200 rounded-md max-w-md mx-auto'>
      <h2 className='text-2xl font-semibold mb-6'>Login now to <span className='text-red-500'> LearnIn </span></h2>
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
        <h2 className='mt-5' onClick={testLogin}><i className='text-blue-500 cursor-pointer'>Fill test credentials </i></h2>
        <Button variant="outline" className='py-2 px-4 bg-blue-500 text-white rounded-md' onClick={handleRegister}>
         Login
        </Button>
        <h2 className='mt-5'><Link href='/Register'><i className='text-blue-500 '>Sign Up for LearnIn </i></Link></h2>
      </form>
    </div>
  );}
  else{
    return(
    <UserDashboard/>
    )
  }
};

export default Login;
