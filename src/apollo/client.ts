import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const countriesLink = new HttpLink({
  uri: 'https://countries.trevorblades.com/',
});

export const apolloClient = new ApolloClient({
  link: countriesLink,
  // Default fetchPolicy is cache-first, so repeat country queries skip the network
  // when InMemoryCache already has the requested fields.
  cache: new InMemoryCache({
    typePolicies: {
      Country: {
        keyFields: ['code'],
      },
    },
  }),
});
