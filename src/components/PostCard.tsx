import { type FormEvent, useState } from 'react';
import type { PostSummaryFragment } from '../generated/posts/graphql';
import { useDeletePostMutation, useUpdatePostMutation } from '../hooks/usePosts';

type PostCardProps = {
  post: PostSummaryFragment;
};

export function PostCard({ post }: PostCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title ?? '');
  const [body, setBody] = useState(post.body ?? '');
  const [updatePost, updateState] = useUpdatePostMutation();
  const [deletePost, deleteState] = useDeletePostMutation();

  if (!post.id) {
    return null;
  }

  const postId = post.id;

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await updatePost({
      variables: {
        id: postId,
        input: {
          title: title.trim(),
          body: body.trim(),
        },
      },
    });

    if (!result.errors && result.data?.updatePost) {
      setIsEditing(false);
    }
  }

  function handleDelete() {
    void deletePost({
      variables: { id: postId },
    });
  }

  return (
    <article className="post-card">
      {isEditing ? (
        <form className="post-form post-form-inline" onSubmit={handleUpdate}>
          <label htmlFor={`edit-title-${postId}`}>Title</label>
          <input
            id={`edit-title-${postId}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <label htmlFor={`edit-body-${postId}`}>Body</label>
          <textarea
            id={`edit-body-${postId}`}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            rows={3}
          />
          <div className="post-actions">
            <button type="submit" disabled={updateState.loading}>
              {updateState.loading ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              className="button-secondary"
              onClick={() => {
                setTitle(post.title ?? '');
                setBody(post.body ?? '');
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
          {updateState.error ? (
            <p className="inline-error" role="alert">
              Could not update the post. {updateState.error.message}
            </p>
          ) : null}
        </form>
      ) : (
        <>
          <h3>{post.title ?? 'Untitled post'}</h3>
          <p>{post.body ?? 'No body'}</p>
          <p className="country-meta">ID {postId}</p>
          <div className="post-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="button-danger"
              onClick={handleDelete}
              disabled={deleteState.loading}
            >
              {deleteState.loading ? 'Deleting…' : 'Delete'}
            </button>
          </div>
          {deleteState.error ? (
            <p className="inline-error" role="alert">
              Could not delete the post. {deleteState.error.message}
            </p>
          ) : null}
        </>
      )}
    </article>
  );
}
