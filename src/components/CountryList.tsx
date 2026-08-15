import { CountryCard } from './CountryCard';
import type { GetCountriesQuery } from '../generated/graphql';

type CountryListProps = {
  countries: GetCountriesQuery['countries'];
};

export function CountryList({ countries }: CountryListProps) {
  return (
    <ul className="country-list">
      {countries.map((country) => (
        <CountryCard key={country.code} country={country} />
      ))}
    </ul>
  );
}
