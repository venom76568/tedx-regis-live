import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://tedx-backend-6x4f.onrender.com/graphql", // Replace with your GraphQL server
  cache: new InMemoryCache(),
});

export default client;
