// pages/api/register.js
import bcrypt from 'bcrypt';
import { connectToDB } from '@/lib/mongoose';
import user from '@/lib/models/user.model';
import { NextResponse } from 'next/server';
export const  POST=async(req, res)=> {
  await connectToDB();

    const { username, password } = await req.json();
    try {
      // Find the user in the database
      const userData = await user.findOne({ username });

      if (!userData) {
        return NextResponse.json('User not found')
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (!passwordMatch) {
        return NextResponse.json('Invalid username or password')
      }

      // Authentication successful
      return NextResponse.json({ message: 'Login successful', user: { username: userData.username } });
    } catch (error) {
      console.error('Login failed:', error);
      return NextResponse.json({ message: 'Internal Server Error' });
    }
}
