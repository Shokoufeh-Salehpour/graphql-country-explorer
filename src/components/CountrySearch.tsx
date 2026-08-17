type CountrySearchProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
};

export function CountrySearch({
  value,
  onChange,
  resultCount,
  totalCount,
}: CountrySearchProps) {
  return (
    <div className="country-search">
      <label htmlFor="country-search">Search countries</label>
      <input
        id="country-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Filter by name, code, capital, or continent"
        autoComplete="off"
        spellCheck={false}
        aria-controls="country-results"
        aria-describedby="country-search-help"
      />
      <p id="country-search-help" className="field-help">
        Filtering happens in the browser against the countries already in Apollo cache.
        Showing {resultCount} of {totalCount} countries.
      </p>
    </div>
  );
}
