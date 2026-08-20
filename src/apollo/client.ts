import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, type Operation } from '@apollo/client';

export const POSTS_API_CONTEXT = { clientName: 'posts' };

const POSTS_OPERATION_NAMES = new Set(['GetPosts', 'CreatePost', 'UpdatePost', 'DeletePost']);

function isPostsRequest(operation: Operation) {
  return (
    operation.getContext().clientName === POSTS_API_CONTEXT.clientName ||
    POSTS_OPERATION_NAMES.has(operation.operationName)
  );
}

const countriesLink = new HttpLink({
  uri: 'https://countries.trevorblades.com/',
});

const postsLink = new HttpLink({
  uri: 'https://graphqlzero.almansi.me/api',
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.split(isPostsRequest, postsLink, countriesLink),
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
