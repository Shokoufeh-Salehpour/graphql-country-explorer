import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GetCountryDocument } from '../generated/graphql';

export function CountryDetails() {
  const { code } = useParams();
  const countryCode = code?.toUpperCase();

  const { data, error, loading } = useQuery(GetCountryDocument, {
    skip: !countryCode,
    variables: { code: countryCode ?? '' },
  });

  if (!countryCode) {
    return (
      <section className="details-card status-card">
        A country code is required to show country details.
      </section>
    );
  }

  if (loading) {
    return <section className="details-card status-card">Loading country details…</section>;
  }

  if (error) {
    return (
      <section className="details-card status-card error-card" role="alert">
        We couldn’t find details for “{countryCode}”. Try a valid two-letter country code.
      </section>
    );
  }

  const country = data?.country;

  if (!country) {
    return (
      <section className="details-card status-card">
        No country was found for “{countryCode}”.
      </section>
    );
  }

  return (
    <>
      <Link className="back-link" to="/">
        ← All countries
      </Link>
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
