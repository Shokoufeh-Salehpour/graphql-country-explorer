import { useApolloClient, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCountryCacheSource } from '../apollo/cacheInspect';
import { CacheNotice } from '../components/CacheNotice';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { GetCountryDocument } from '../generated/graphql';

export function CountryDetails() {
  const { code } = useParams();
  const countryCode = code?.toUpperCase();
  const client = useApolloClient();
  const cacheSource = useMemo(
    () => (countryCode ? getCountryCacheSource(client, countryCode) : 'network'),
    [client, countryCode],
  );

  // Default fetchPolicy is cache-first. Repeat visits read from InMemoryCache.
  const { data, error, loading } = useQuery(GetCountryDocument, {
    skip: !countryCode,
    variables: { code: countryCode ?? '' },
  });

  if (!countryCode) {
    return <EmptyState message="A country code is required to show country details." />;
  }

  if (loading) {
    return (
      <>
        {cacheSource === 'summary-only' ? <CacheNotice source={cacheSource} /> : null}
        <LoadingState message="Loading country details…" />
      </>
    );
  }

  if (error) {
    return (
      <ErrorState
        message={`We couldn’t load details for “${countryCode}”. Please try again.`}
      />
    );
  }

  const country = data?.country;

  if (!country) {
    return <EmptyState message={`No country was found for “${countryCode}”.`} />;
  }

  return (
    <>
      <Link className="back-link" to="/">
        ← All countries
      </Link>
      <CacheNotice source={cacheSource} />
      <section className="details-card" aria-labelledby="country-name">
        <div className="country-heading">
          <span aria-hidden="true">{country.emoji}</span>
          <div>
            <p className="eyebrow">{country.code}</p>
            <h2 id="country-name">{country.name}</h2>
          </div>
        </div>

        <dl className="country-details">
          <div>
            <dt>Capital</dt>
            <dd>{country.capital ?? 'Not listed'}</dd>
          </div>
          <div>
            <dt>Continent</dt>
            <dd>{country.continent.name}</dd>
          </div>
          <div>
            <dt>Currency</dt>
            <dd>{country.currency ?? 'Not listed'}</dd>
          </div>
          <div>
            <dt>Calling code</dt>
            <dd>+{country.phone}</dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>
              {country.languages.length > 0
                ? country.languages.map((language) => language.name).join(', ')
                : 'Not listed'}
            </dd>
          </div>
          <div>
            <dt>States</dt>
            <dd>
              {country.states.length > 0
                ? country.states.map((state) => state.name).join(', ')
                : 'No state data'}
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
