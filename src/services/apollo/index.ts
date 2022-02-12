import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3010/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyMDAwMDAxLCJpYXQiOjE2NDQ1ODc5MTcsImV4cCI6MTY0NDU4ODgxN30.uzC7GJAn0Rnqe_iY8CJtYX5OSMNpC7t20Sis3B5aGxs' ||
      null,
  },
});

export default client;
