import { gql } from 'apollo-server-express';

// Define the GraphQL schema
const typeDefs = gql`
    # User Type - Represents the User in the system
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        createdAt: String!
    }

    # Community Post Type - Represents a community post
    type CommunityPost {
        id: ID!
        author: User!              # Author of the post (linked to the User type)
        title: String!
        content: String!
        category: String!
        aiSummary: String
        createdAt: String!
        updatedAt: String
    }

    # Help Request Type - Represents a help request from the community
    type HelpRequest {
        id: ID!
        author: User!              # Author of the help request (linked to the User type)
        description: String!
        location: String
        isResolved: Boolean!
        volunteers: [User]         # List of volunteers who helped
        createdAt: String!
        updatedAt: String
    }

    # Query to retrieve the community posts and help requests
    type Query {
        getAllCommunityPosts: [CommunityPost!]!    # Get all community posts
        getCommunityPost(id: ID!): CommunityPost    # Get a specific community post by ID
        getAllHelpRequests: [HelpRequest!]!        # Get all help requests
        getHelpRequest(id: ID!): HelpRequest        # Get a specific help request by ID
    }

    # Mutations for creating, updating, and deleting community posts and help requests
    type Mutation {
        createCommunityPost(
            title: String!
            content: String!
            category: String!
            aiSummary: String
        ): CommunityPost!                      # Create a new community post

        updateCommunityPost(
            id: ID!
            title: String
            content: String
            category: String
            aiSummary: String
        ): CommunityPost!                      # Update an existing community post

        deleteCommunityPost(id: ID!): Boolean!  # Delete a community post

        createHelpRequest(
            description: String!
            location: String
        ): HelpRequest!                        # Create a new help request

        updateHelpRequest(
            id: ID!
            description: String
            location: String
            isResolved: Boolean
        ): HelpRequest!                        # Update an existing help request

        deleteHelpRequest(id: ID!): Boolean!    # Delete a help request
    }
`;

export default typeDefs;
