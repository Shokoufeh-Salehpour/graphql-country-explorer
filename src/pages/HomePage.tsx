import { useQuery } from '@apollo/client';
import { CountryList } from '../components/CountryList';
import { GetCountriesDocument } from '../generated/graphql';

export function HomePage() {
  const { data, error, loading } = useQuery(GetCountriesDocument);

  return (
    <section className="explorer" aria-labelledby="app-title">
      <header className="intro">
        <p className="eyebrow">Phase 2 · Variables & Fragments</p>
        <h1 id="app-title">GraphQL Country Explorer</h1>
        <p>
          Select a country to view a details route backed by a GraphQL variable and
          nested GraphQL fields.
        </p>
      </header>

      {loading ? <section className="details-card status-card">Loading countries…</section> : null}
      {error ? (
        <section className="details-card status-card error-card" role="alert">
          We couldn’t load the country list. Please refresh and try again.
        </section>
      ) : null}
      {!loading && !error && data?.countries.length === 0 ? (
        <section className="details-card status-card">No countries are available.</section>
      ) : null}
      {!loading && !error && data?.countries.length ? <CountryList countries={data.countries} /> : null}
    </section>
  );
}
