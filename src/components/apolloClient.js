import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Replace with your GraphQL server
  cache: new InMemoryCache(),
});

export default client;
