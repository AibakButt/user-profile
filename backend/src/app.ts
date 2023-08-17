import express from 'express';
import typeDefs from "./graphql/typeDefs" ;
import resolvers from './graphql/resolvers';
import { ApolloServer } from 'apollo-server-express';
import { connect } from './database';

const app = express();
const PORT = process.env.PORT || 5000;

connect()

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/v1/graph/api"});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
