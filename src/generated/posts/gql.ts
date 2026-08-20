/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment PostSummary on Post {\n  id\n  title\n  body\n}": typeof types.PostSummaryFragmentDoc,
    "mutation CreatePost($input: CreatePostInput!) {\n  createPost(input: $input) {\n    ...PostSummary\n  }\n}": typeof types.CreatePostDocument,
    "mutation DeletePost($id: ID!) {\n  deletePost(id: $id)\n}": typeof types.DeletePostDocument,
    "mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {\n  updatePost(id: $id, input: $input) {\n    ...PostSummary\n  }\n}": typeof types.UpdatePostDocument,
    "query GetPosts($options: PageQueryOptions) {\n  posts(options: $options) {\n    data {\n      ...PostSummary\n    }\n  }\n}": typeof types.GetPostsDocument,
};
const documents: Documents = {
    "fragment PostSummary on Post {\n  id\n  title\n  body\n}": types.PostSummaryFragmentDoc,
    "mutation CreatePost($input: CreatePostInput!) {\n  createPost(input: $input) {\n    ...PostSummary\n  }\n}": types.CreatePostDocument,
    "mutation DeletePost($id: ID!) {\n  deletePost(id: $id)\n}": types.DeletePostDocument,
    "mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {\n  updatePost(id: $id, input: $input) {\n    ...PostSummary\n  }\n}": types.UpdatePostDocument,
    "query GetPosts($options: PageQueryOptions) {\n  posts(options: $options) {\n    data {\n      ...PostSummary\n    }\n  }\n}": types.GetPostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PostSummary on Post {\n  id\n  title\n  body\n}"): (typeof documents)["fragment PostSummary on Post {\n  id\n  title\n  body\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePost($input: CreatePostInput!) {\n  createPost(input: $input) {\n    ...PostSummary\n  }\n}"): (typeof documents)["mutation CreatePost($input: CreatePostInput!) {\n  createPost(input: $input) {\n    ...PostSummary\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeletePost($id: ID!) {\n  deletePost(id: $id)\n}"): (typeof documents)["mutation DeletePost($id: ID!) {\n  deletePost(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {\n  updatePost(id: $id, input: $input) {\n    ...PostSummary\n  }\n}"): (typeof documents)["mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {\n  updatePost(id: $id, input: $input) {\n    ...PostSummary\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPosts($options: PageQueryOptions) {\n  posts(options: $options) {\n    data {\n      ...PostSummary\n    }\n  }\n}"): (typeof documents)["query GetPosts($options: PageQueryOptions) {\n  posts(options: $options) {\n    data {\n      ...PostSummary\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;