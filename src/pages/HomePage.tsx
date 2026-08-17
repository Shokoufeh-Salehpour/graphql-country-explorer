import { useApolloClient, useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { hasCachedCountryList } from '../apollo/cacheInspect';
import { CacheNotice } from '../components/CacheNotice';
import { CountryList } from '../components/CountryList';
import { CountrySearch } from '../components/CountrySearch';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import {
  GetCountriesDocument,
  type CountrySummaryFragment,
} from '../generated/graphql';

function matchesCountry(country: CountrySummaryFragment, searchTerm: string) {
  const query = searchTerm.trim().toLowerCase();

  if (query.length === 0) {
    return true;
  }

  const haystack = [
    country.name,
    country.code,
    country.capital ?? '',
    country.continent.name,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

export function HomePage() {
  const client = useApolloClient();
  const [searchTerm, setSearchTerm] = useState('');
  const listWasCached = useMemo(() => hasCachedCountryList(client), [client]);
  const { data, error, loading } = useQuery(GetCountriesDocument);

  const countries = data?.countries;
  const filteredCountries = useMemo(
    () => (countries ?? []).filter((country) => matchesCountry(country, searchTerm)),
    [countries, searchTerm],
  );

  return (
    <section className="explorer" aria-labelledby="app-title">
      <header className="intro">
        <p className="eyebrow">Phase 4 · Search, states & cache</p>
        <h1 id="app-title">GraphQL Country Explorer</h1>
        <p>
          Search filters countries already stored in Apollo Client. Opening a country
          still uses a GraphQL variable; repeat visits are served from InMemoryCache.
        </p>
      </header>

      {loading ? <LoadingState message="Loading countries…" /> : null}
      {error ? (
        <ErrorState message="We couldn’t load the country list. Please refresh and try again." />
      ) : null}

      {!loading && !error ? (
        <>
          {listWasCached ? <CacheNotice source="list" /> : null}
          <CountrySearch
            value={searchTerm}
            onChange={setSearchTerm}
            resultCount={filteredCountries.length}
            totalCount={countries?.length ?? 0}
          />
          <div id="country-results">
            {filteredCountries.length === 0 ? (
              <EmptyState
                message={
                  searchTerm.trim()
                    ? `No countries match “${searchTerm.trim()}”.`
                    : 'No countries are available.'
                }
              />
            ) : (
              <CountryList countries={filteredCountries} />
            )}
          </div>
        </>
      ) : null}
    </section>
  );
}
