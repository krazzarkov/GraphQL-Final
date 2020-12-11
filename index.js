import aserver from "apollo-server";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";


import pkg from 'graphql-subscriptions';
const { PubSub } = pkg;

const { ApolloServer } = aserver;
const pubsub = new PubSub();

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers, context: ({req, res}) => ({req, res, pubsub}) });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  });
};

startServer();