import type { CountryCacheSource } from '../apollo/cacheInspect';

type CacheNoticeProps = {
  source: CountryCacheSource | 'list';
};

const messages: Record<CacheNoticeProps['source'], string> = {
  'full-query':
    'Served from Apollo cache. This country was already queried, so no extra network request was needed.',
  'summary-only':
    'Normalized cache reused this country’s summary from the list. Extra fields are requested once, then merged into the same Country cache entry.',
  network: 'Fetched from the Countries API and stored in Apollo’s InMemoryCache.',
  list: 'Country list served from Apollo cache. Navigating back here does not refetch GetCountries.',
};

export function CacheNotice({ source }: CacheNoticeProps) {
  return <p className="cache-notice">{messages[source]}</p>;
}
