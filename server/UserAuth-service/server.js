require("dotenv").config(); // Load environment variables
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const configureMongoose = require("./config/mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const startServer = async () => {
    try {
        // Connect to MongoDB
        await configureMongoose();

        // Initialize Apollo GraphQL server
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        // Start the standalone server
        const { url } = await startStandaloneServer(server, {
            listen: { port: process.env.PORT || 4001 }, // Default to port 4001 for UserAuth-Service
        });

        console.log(`🚀 UserAuth-Service GraphQL server ready at ${url}`);
    } catch (error) {
        console.error("❌ Server startup error:", error);
    }
};

// Start the server
startServer();
