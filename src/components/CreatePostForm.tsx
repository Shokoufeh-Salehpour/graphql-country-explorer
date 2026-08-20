import { type FormEvent, useState } from 'react';
import { useCreatePostMutation } from '../hooks/usePosts';

export function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [createPost, { data, error, loading }] = useCreatePostMutation();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      return;
    }

    const result = await createPost({
      variables: {
        input: {
          title: trimmedTitle,
          body: trimmedBody,
        },
      },
    }).catch(() => undefined);

    if (result && !result.errors && result.data?.createPost) {
      setTitle('');
      setBody('');
    }
  }

  const createdPost = data?.createPost;

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Create a post</h2>
      <p className="field-help">
        Create uses <code>refetchQueries</code>, then adds the mutation result to
        the Apollo cache so the new post appears in the list.
      </p>
      <label htmlFor="post-title">Title</label>
      <input
        id="post-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        autoComplete="off"
      />
      <label htmlFor="post-body">Body</label>
      <textarea
        id="post-body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        required
        rows={4}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating…' : 'Create post'}
      </button>
      {error ? (
        <p className="inline-error" role="alert">
          Could not create the post. {error.message}
        </p>
      ) : null}
      {createdPost ? (
        <p className="inline-success" role="status">
          Created post {createdPost.id}: {createdPost.title}. It was added to the
          list from the mutation result because GraphQL Zero does not persist writes.
        </p>
      ) : null}
    </form>
  );
}
