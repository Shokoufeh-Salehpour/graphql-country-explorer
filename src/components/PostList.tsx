import type { PostSummaryFragment } from '../generated/posts/graphql';
import { PostCard } from './PostCard';

type PostListProps = {
  posts: PostSummaryFragment[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
