const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const resolvers = {
    Query: {
        users: async () => await User.find(),
        user: async (_, { id }) => await User.findById(id),
    },
    Mutation: {
        signup: async (_, { username, email, password, role }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already in use');
            }
            const user = new User({ username, email, password, role });
            await user.save();
            return { token: generateToken(user), user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Invalid password');
            }
            return { token: generateToken(user), user };
        },
        updateUser: async (_, { id, username, email, role }) => {
            return await User.findByIdAndUpdate(id, { username, email, role }, { new: true });
        },
        deleteUser: async (_, { id }) => {
            const user = await User.findByIdAndDelete(id);
            return user ? true : false;
        }
    }
};

module.exports = resolvers;
