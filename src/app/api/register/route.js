// pages/api/register.js
import bcrypt from 'bcrypt';
import { connectToDB } from '@/lib/mongoose';
import user from '@/lib/models/user.model';
import { NextResponse } from 'next/server';
export const  POST=async(req, res)=> {
  await connectToDB();

    const { username, password } = await req.json();
    try {
      // Check if the username already exists
      const existingUser = await user.findOne({ username });

      if (existingUser) {
       console.log({ message: 'Username already exists' });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Save the user to the database
      const newUser = new user({
        username,
        password: hashedPassword,
      });

      await newUser.save();

      console.log({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration failed:', error);
      console.log({ message: 'Internal Server Error' });
    }
    return NextResponse.json('done')
}
