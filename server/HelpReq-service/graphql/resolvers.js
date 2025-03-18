const axios = require("axios");
const HelpRequest = require("../models/HelpRequest");

const USER_SERVICE_URL = "http://localhost:4001"; // Replace with actual UserAuth-Service URL

const resolvers = {
  Query: {
    getHelpRequest: async (_, { id }) => {
      const request = await HelpRequest.findById(id);
      if (!request) throw new Error("Help request not found");

      // Fetch author details
      const author = await axios.get(`${USER_SERVICE_URL}/users/${request.author}`).then(res => res.data);

      // Fetch volunteer details
      const volunteers = await Promise.all(
        request.volunteers.map(async (volunteerId) =>
          axios.get(`${USER_SERVICE_URL}/users/${volunteerId}`).then(res => res.data)
        )
      );

      return { ...request.toObject(), author, volunteers };
    },

    getAllHelpRequests: async () => {
      const requests = await HelpRequest.find();
      return Promise.all(
        requests.map(async (request) => {
          const author = await axios.get(`${USER_SERVICE_URL}/users/${request.author}`).then(res => res.data);
          const volunteers = await Promise.all(
            request.volunteers.map(async (volunteerId) =>
              axios.get(`${USER_SERVICE_URL}/users/${volunteerId}`).then(res => res.data)
            )
          );
          return { ...request.toObject(), author, volunteers };
        })
      );
    },

    getHelpRequestsByLocation: async (_, { location }) => {
      const requests = await HelpRequest.find({ location });
      return Promise.all(
        requests.map(async (request) => {
          const author = await axios.get(`${USER_SERVICE_URL}/users/${request.author}`).then(res => res.data);
          const volunteers = await Promise.all(
            request.volunteers.map(async (volunteerId) =>
              axios.get(`${USER_SERVICE_URL}/users/${volunteerId}`).then(res => res.data)
            )
          );
          return { ...request.toObject(), author, volunteers };
        })
      );
    },
  },

  Mutation: {
    createHelpRequest: async (_, { author, description, location }) => {
      try {
        await axios.get(`${USER_SERVICE_URL}/users/${author}`);
      } catch (error) {
        throw new Error("Invalid author ID");
      }

      const newRequest = new HelpRequest({ author, description, location });
      return await newRequest.save();
    },

    updateHelpRequest: async (_, { id, description, location, isResolved }) => {
      const updatedRequest = await HelpRequest.findByIdAndUpdate(
        id,
        { description, location, isResolved, updatedAt: new Date() },
        { new: true }
      );
      if (!updatedRequest) throw new Error("Help request not found");

      const author = await axios.get(`${USER_SERVICE_URL}/users/${updatedRequest.author}`).then(res => res.data);
      const volunteers = await Promise.all(
        updatedRequest.volunteers.map(async (volunteerId) =>
          axios.get(`${USER_SERVICE_URL}/users/${volunteerId}`).then(res => res.data)
        )
      );

      return { ...updatedRequest.toObject(), author, volunteers };
    },

    deleteHelpRequest: async (_, { id }) => {
      const deleted = await HelpRequest.findByIdAndDelete(id);
      return !!deleted;
    },

    addVolunteer: async (_, { id, volunteerId }) => {
      try {
        await axios.get(`${USER_SERVICE_URL}/users/${volunteerId}`);
      } catch (error) {
        throw new Error("Invalid volunteer ID");
      }

      const updatedRequest = await HelpRequest.findByIdAndUpdate(
        id,
        { $addToSet: { volunteers: volunteerId }, updatedAt: new Date() },
        { new: true }
      );
      if (!updatedRequest) throw new Error("Help request not found");

      const author = await axios.get(`${USER_SERVICE_URL}/users/${updatedRequest.author}`).then(res => res.data);
      const volunteers = await Promise.all(
        updatedRequest.volunteers.map(async (vId) =>
          axios.get(`${USER_SERVICE_URL}/users/${vId}`).then(res => res.data)
        )
      );

      return { ...updatedRequest.toObject(), author, volunteers };
    },
  },
};

module.exports = resolvers;
