import { CountryCard } from './CountryCard';

type CountryListProps = {
  countries: Array<{
    capital: string | null;
    code: string;
    continent: {
      name: string;
    };
    emoji: string;
    name: string;
  }>;
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
