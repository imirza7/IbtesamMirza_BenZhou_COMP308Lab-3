const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type HelpRequest {
    id: ID!
    author: User!
    description: String!
    location: String
    isResolved: Boolean!
    volunteers: [User]
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getHelpRequest(id: ID!): HelpRequest
    getAllHelpRequests: [HelpRequest]
    getHelpRequestsByLocation(location: String!): [HelpRequest]
  }

  type Mutation {
    createHelpRequest(author: ID!, description: String!, location: String): HelpRequest
    updateHelpRequest(id: ID!, description: String, location: String, isResolved: Boolean): HelpRequest
    deleteHelpRequest(id: ID!): Boolean
    addVolunteer(id: ID!, volunteerId: ID!): HelpRequest
  }
`;

module.exports = typeDefs;
