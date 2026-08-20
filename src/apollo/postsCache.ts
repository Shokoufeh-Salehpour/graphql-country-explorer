import type { ApolloCache, Reference } from '@apollo/client';
import {
  PostSummaryFragmentDoc,
  type PostSummaryFragment,
} from '../generated/posts/graphql';

function hasPostList(
  value: unknown,
): value is { data?: readonly (Reference | null)[] } {
  return typeof value === 'object' && value !== null && 'data' in value;
}

export function addPostToCachedList(
  cache: ApolloCache<object>,
  post: PostSummaryFragment,
) {
  if (!post.id) {
    return;
  }

  const newPostRef = cache.writeFragment({
    fragment: PostSummaryFragmentDoc,
    data: {
      __typename: 'Post',
      id: post.id,
      title: post.title ?? null,
      body: post.body ?? null,
    },
  });

  if (!newPostRef) {
    return;
  }

  cache.modify({
    fields: {
      posts(existing, { readField }) {
        if (!hasPostList(existing)) {
          return {
            __typename: 'PostsPage',
            data: [newPostRef],
          };
        }

        const data = existing.data ?? [];
        const alreadyPresent = data.some(
          (postRef) => postRef && String(readField('id', postRef)) === String(post.id),
        );

        if (alreadyPresent) {
          return existing;
        }

        return {
          ...existing,
          data: [newPostRef, ...data],
        };
      },
    },
  });
}

export function removePostFromCachedList(cache: ApolloCache<object>, postId: string) {
  cache.modify({
    fields: {
      posts(existing, { readField }) {
        if (!hasPostList(existing) || !existing.data) {
          return existing;
        }

        return {
          ...existing,
          data: existing.data.filter((postRef) => {
            if (!postRef) {
              return false;
            }

            return String(readField('id', postRef)) !== postId;
          }),
        };
      },
    },
  });
}
