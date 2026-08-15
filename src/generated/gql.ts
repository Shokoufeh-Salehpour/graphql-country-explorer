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
    "fragment CountrySummary on Country {\n  code\n  name\n  emoji\n  capital\n  continent {\n    code\n    name\n  }\n}": typeof types.CountrySummaryFragmentDoc,
    "query GetCountries {\n  countries {\n    ...CountrySummary\n  }\n}": typeof types.GetCountriesDocument,
    "query GetCountry($code: ID!) {\n  country(code: $code) {\n    ...CountrySummary\n    phone\n    currency\n    languages {\n      code\n      name\n      native\n    }\n    states {\n      code\n      name\n    }\n  }\n}": typeof types.GetCountryDocument,
};
const documents: Documents = {
    "fragment CountrySummary on Country {\n  code\n  name\n  emoji\n  capital\n  continent {\n    code\n    name\n  }\n}": types.CountrySummaryFragmentDoc,
    "query GetCountries {\n  countries {\n    ...CountrySummary\n  }\n}": types.GetCountriesDocument,
    "query GetCountry($code: ID!) {\n  country(code: $code) {\n    ...CountrySummary\n    phone\n    currency\n    languages {\n      code\n      name\n      native\n    }\n    states {\n      code\n      name\n    }\n  }\n}": types.GetCountryDocument,
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
export function graphql(source: "fragment CountrySummary on Country {\n  code\n  name\n  emoji\n  capital\n  continent {\n    code\n    name\n  }\n}"): (typeof documents)["fragment CountrySummary on Country {\n  code\n  name\n  emoji\n  capital\n  continent {\n    code\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCountries {\n  countries {\n    ...CountrySummary\n  }\n}"): (typeof documents)["query GetCountries {\n  countries {\n    ...CountrySummary\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCountry($code: ID!) {\n  country(code: $code) {\n    ...CountrySummary\n    phone\n    currency\n    languages {\n      code\n      name\n      native\n    }\n    states {\n      code\n      name\n    }\n  }\n}"): (typeof documents)["query GetCountry($code: ID!) {\n  country(code: $code) {\n    ...CountrySummary\n    phone\n    currency\n    languages {\n      code\n      name\n      native\n    }\n    states {\n      code\n      name\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;