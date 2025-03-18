const axios = require("axios");
const mongoose = require("mongoose");
const CommunityPost = require("../models/CommunityPost");

const USER_SERVICE_URL = "http://localhost:4001"; // Update with actual UserAuth-Service URL

const resolvers = {
  Query: {
    getPost: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid post ID format");
      }

      const post = await CommunityPost.findById(id);
      if (!post) throw new Error("Post not found");

      try {
        const author = await axios.get(`${USER_SERVICE_URL}/users/${post.author}`).then(res => res.data);
        return { ...post.toObject(), author };
      } catch (error) {
        throw new Error("Failed to fetch author details");
      }
    },

    getAllPosts: async () => {
      const posts = await CommunityPost.find();
      return Promise.all(
        posts.map(async (post) => {
          try {
            const author = await axios.get(`${USER_SERVICE_URL}/users/${post.author}`).then(res => res.data);
            return { ...post.toObject(), author };
          } catch {
            return { ...post.toObject(), author: null }; // Fallback in case author API fails
          }
        })
      );
    },

    getPostsByCategory: async (_, { category }) => {
      const posts = await CommunityPost.find({ category });
      return Promise.all(
        posts.map(async (post) => {
          try {
            const author = await axios.get(`${USER_SERVICE_URL}/users/${post.author}`).then(res => res.data);
            return { ...post.toObject(), author };
          } catch {
            return { ...post.toObject(), author: null };
          }
        })
      );
    },
  },

  Mutation: {
    createPost: async (_, { title, content, category, author }) => {
      if (!mongoose.Types.ObjectId.isValid(author)) {
        throw new Error("Invalid author ID format");
      }

      try {
        await axios.get(`${USER_SERVICE_URL}/users/${author}`);
      } catch (error) {
        throw new Error("Author does not exist");
      }

      const newPost = new CommunityPost({
        title,
        content,
        category,
        author: mongoose.Types.ObjectId(author),
      });

      return await newPost.save();
    },

    updatePost: async (_, { id, title, content, category }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid post ID format");
      }

      const updatedPost = await CommunityPost.findByIdAndUpdate(
        id,
        { title, content, category, updatedAt: new Date() },
        { new: true }
      );

      if (!updatedPost) throw new Error("Post not found");

      try {
        const author = await axios.get(`${USER_SERVICE_URL}/users/${updatedPost.author}`).then(res => res.data);
        return { ...updatedPost.toObject(), author };
      } catch {
        return { ...updatedPost.toObject(), author: null };
      }
    },

    deletePost: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid post ID format");
      }

      const deleted = await CommunityPost.findByIdAndDelete(id);
      return !!deleted;
    },
  },
};

module.exports = resolvers;


