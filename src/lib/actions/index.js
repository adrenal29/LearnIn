"use server"
import bcrypt from 'bcrypt';
import {connectToDB} from '@/lib/mongoose.js';
import user from '../models/user.model';

export async function register(username,password){
    await connectToDB();
      
      //Check if the username already exists
      const existingUser = await user.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
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
      
    }