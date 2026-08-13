import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const countriesLink = new HttpLink({
  uri: 'https://countries.trevorblades.com/',
});

export const apolloClient = new ApolloClient({
  link: countriesLink,
  cache: new InMemoryCache({
    typePolicies: {
      Country: {
        keyFields: ['code'],
      },
    },
  }),
});
