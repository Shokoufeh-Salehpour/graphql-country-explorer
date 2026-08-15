import { Link } from 'react-router-dom';

type CountryCardProps = {
  country: {
    capital: string | null;
    code: string;
    continent: {
      name: string;
    };
    emoji: string;
    name: string;
  };
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <li>
      <Link className="country-card" to={`/country/${country.code}`}>
        <span className="country-flag" aria-hidden="true">
          {country.emoji}
        </span>
        <span>
          <strong>{country.name}</strong>
          <small>{country.code}</small>
        </span>
        <span className="country-meta">
          {country.capital ?? 'Capital not listed'} · {country.continent.name}
        </span>
      </Link>
    </li>
  );
}
