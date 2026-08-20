import { CreatePostForm } from '../components/CreatePostForm';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PostList } from '../components/PostList';
import type { PostSummaryFragment } from '../generated/posts/graphql';
import { usePostsQuery } from '../hooks/usePosts';

function isPost(
  post: PostSummaryFragment | null | undefined,
): post is PostSummaryFragment {
  return Boolean(post?.id);
}

export function PostsPage() {
  const { data, error, loading } = usePostsQuery();
  const posts = data?.posts?.data?.filter(isPost) ?? [];

  return (
    <section className="explorer" aria-labelledby="posts-title">
      <header className="intro">
        <p className="eyebrow">Phase 5 · Mutations & cache updates</p>
        <h1 id="posts-title">Posts</h1>
        <p>
          This section uses GraphQL Zero so the app can demonstrate mutations. Create
          refetches <code>GetPosts</code>, then inserts the new post into the cache.
          Delete updates the cache with <code>cache.modify()</code>. Update uses an
          optimistic response.
        </p>
      </header>

      <CreatePostForm />

      {loading ? <LoadingState message="Loading posts…" /> : null}
      {error ? (
        <ErrorState message="We couldn’t load posts. Please refresh and try again." />
      ) : null}
      {!loading && !error && posts.length === 0 ? (
        <EmptyState message="No posts are available." />
      ) : null}
      {!loading && !error && posts.length > 0 ? <PostList posts={posts} /> : null}
    </section>
  );
}
