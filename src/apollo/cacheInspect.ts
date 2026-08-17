import type { ApolloClient } from '@apollo/client';
import {
  CountrySummaryFragmentDoc,
  GetCountriesDocument,
  GetCountryDocument,
  type CountrySummaryFragment,
} from '../generated/graphql';

export type CountryCacheSource = 'full-query' | 'summary-only' | 'network';

function readCachedCountryQuery(client: ApolloClient<object>, code: string) {
  try {
    return client.readQuery({
      query: GetCountryDocument,
      variables: { code },
    });
  } catch {
    return null;
  }
}

function readCachedCountrySummary(client: ApolloClient<object>, code: string) {
  const cacheId = client.cache.identify({ __typename: 'Country', code });

  if (!cacheId) {
    return null;
  }

  try {
    return client.readFragment<CountrySummaryFragment>({
      id: cacheId,
      fragment: CountrySummaryFragmentDoc,
    });
  } catch {
    return null;
  }
}

export function getCountryCacheSource(
  client: ApolloClient<object>,
  code: string,
): CountryCacheSource {
  if (readCachedCountryQuery(client, code)?.country) {
    return 'full-query';
  }

  if (readCachedCountrySummary(client, code)) {
    return 'summary-only';
  }

  return 'network';
}

export function hasCachedCountryList(client: ApolloClient<object>) {
  try {
    return Boolean(client.readQuery({ query: GetCountriesDocument })?.countries.length);
  } catch {
    return false;
  }
}
