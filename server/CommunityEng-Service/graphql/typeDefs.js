const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type CommunityPost {
    id: ID!
    author: User!   # Fetch User directly from MongoDB
    title: String!
    content: String!
    category: String!
    aiSummary: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getPost(id: ID!): CommunityPost
    getAllPosts: [CommunityPost]
    getPostsByCategory(category: String!): [CommunityPost]
  }

  type Mutation {
    createPost(title: String!, content: String!, category: String!, author: ID!): CommunityPost
    updatePost(id: ID!, title: String, content: String, category: String): CommunityPost
    deletePost(id: ID!): Boolean
  }
`;

module.exports = typeDefs;

