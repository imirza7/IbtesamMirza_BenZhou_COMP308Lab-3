const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        createdAt: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!, role: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        updateUser(id: ID!, username: String, email: String, role: String): User
        deleteUser(id: ID!): Boolean
    }
`;

module.exports = typeDefs;
