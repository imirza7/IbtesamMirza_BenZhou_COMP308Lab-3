import { gql } from 'apollo-server-express';

// Define the GraphQL schema
const typeDefs = gql`
    # User Type - The structure of the user data
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        createdAt: String!
    }

    # AuthPayload - The return type for authentication-related mutations (login)
    type AuthPayload {
        token: String!  # JWT Token
        user: User!     # User information
    }

    # Query for getting the current user based on JWT token
    type Query {
        currentUser: User
    }

    # Mutation for user authentication (login, register)
    type Mutation {
        # Register mutation now accepts username, email, password, and role
        register(username: String!, email: String!, password: String!, role: String!): AuthPayload!

        # Login mutation to authenticate the user and return a token and user details
        login(email: String!, password: String!): AuthPayload!  # Now uses email for login
    }
`;

export default typeDefs;
