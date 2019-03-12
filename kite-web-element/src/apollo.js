import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.use(VueApollo);

const defaultOptions = {
  query: {
    // We use no-cache to resolve an issue where requests on the client-side don't update to reflect changes in the database
    fetchPolicy: 'no-cache'
  }
}

// HTTP connection to the API
const link = new HttpLink({
  uri: "https://localhost/api/graphql",
  credentials: "include",
});

// Cache Implementation - Sadly this is required to create an ApolloClient for some reason
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache,
  defaultOptions
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default apolloProvider;
