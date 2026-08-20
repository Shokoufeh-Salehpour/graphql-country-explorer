import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { POSTS_API_CONTEXT } from '../apollo/client';
import { addPostToCachedList, removePostFromCachedList } from '../apollo/postsCache';
import {
  CreatePostDocument,
  DeletePostDocument,
  GetPostsDocument,
  UpdatePostDocument,
} from '../generated/posts/graphql';

export const GET_POSTS_VARIABLES = {
  options: {
    paginate: {
      page: 1,
      limit: 6,
    },
  },
};

const postsRequest = {
  context: POSTS_API_CONTEXT,
  variables: GET_POSTS_VARIABLES,
};

export function usePostsQuery() {
  return useQuery(GetPostsDocument, postsRequest);
}

export function useCreatePostMutation() {
  const client = useApolloClient();

  return useMutation(CreatePostDocument, {
    context: POSTS_API_CONTEXT,
    // Refetch GetPosts to demonstrate refetchQueries. GraphQL Zero does not persist
    // writes, so the refetched list will not include the new post.
    refetchQueries: ['GetPosts'],
    awaitRefetchQueries: true,
    onCompleted(data) {
      // After the refetch, insert the mutation result so the created post is visible.
      if (data.createPost) {
        addPostToCachedList(client.cache, data.createPost);
      }
    },
  });
}

export function useUpdatePostMutation() {
  return useMutation(UpdatePostDocument, {
    context: POSTS_API_CONTEXT,
    // The new title and body are already in the form, so the UI can render the
    // predicted Post immediately. Apollo rolls this back if the mutation fails.
    optimisticResponse: (variables) => ({
      updatePost: {
        __typename: 'Post' as const,
        id: variables.id,
        title: variables.input.title ?? null,
        body: variables.input.body ?? null,
      },
    }),
  });
}

export function useDeletePostMutation() {
  return useMutation(DeletePostDocument, {
    context: POSTS_API_CONTEXT,
    optimisticResponse: {
      deletePost: true,
    },
    update(cache, { data }, { variables }) {
      const postId = variables?.id;

      if (!data?.deletePost || !postId) {
        return;
      }

      // Strategy 2: cache.modify edits the cached GetPosts result in place.
      // refetchQueries would send another GetPosts request; this only updates
      // memory. That avoids the extra network round-trip, and on GraphQL Zero
      // a refetch would also bring the post back because deletes are not persisted.
      removePostFromCachedList(cache, String(postId));
    },
  });
}
