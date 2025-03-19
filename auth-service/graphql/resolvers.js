import bcrypt from 'bcryptjs';  // use bcryptjs
import jwt from 'jsonwebtoken';  // For JWT token generation
import User from '../models/User.js';  // Import User model
import { config } from '../config/config.js';  // JWT Secret from config

const resolvers = {
    Query: {
        currentUser: async (_, __, { user }) => {
            if (!user) {
                throw new Error('Not authenticated');
            }
            return user;  // Returning the user object (already decoded from the token)
        }
    },
    Mutation: {
        register: async (_, { username, email, password, role }) => {
            // Check if the user already exists by email
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email is already in use');
            }
        
            // Hash the password before saving to the database
            const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
        
            // Create a new user with the hashed password
            const newUser = new User({
                username,
                email,
                password: hashedPassword,  // Store the hashed password
                role
            });
        
            // Save the new user to the database
            await newUser.save();
        
            // Create a JWT token for the newly created user
            const token = jwt.sign({ id: newUser.id, username: newUser.username }, config.JWT_SECRET, { expiresIn: '1d' });
        
            return {
                token,
                user: newUser
            };
        },
        
        login: async (_, { email, password }) => {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                console.error("User not found:", email);  // Log if the user is not found
                throw new Error('User not found');
            }
        
            // Debugging: Log both the provided password and the stored hash
            console.log("Provided password:", password);  // Log the provided password
            console.log("Stored password hash:", user.password);  // Log the stored hashed password
        
            // Compare the entered password with the stored password hash
            const isMatch = await bcrypt.compare(password, user.password);
        
            // Debugging: Log the comparison result
            console.log("Password match result:", isMatch);  // Log the result of bcrypt.compare()
        
            if (!isMatch) {
                console.log("Invalid credentials - password doesn't match.");  // Log if the password doesn't match
                throw new Error('Invalid credentials');
            }
        
            // Create a JWT token for the authenticated user
            const token = jwt.sign({ id: user.id, username: user.username }, config.JWT_SECRET, { expiresIn: '1d' });
        
            return {
                token,
                user
            };
        }
    }
};

export default resolvers;