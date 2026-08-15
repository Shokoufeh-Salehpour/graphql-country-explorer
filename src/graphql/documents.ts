import { gql } from '@apollo/client';
import countrySummaryFragment from './fragments/country.fragment.graphql?raw';
import getCountriesQuery from './queries/countries.graphql?raw';
import getCountryQuery from './queries/country.graphql?raw';

export const GET_COUNTRIES = gql`
  ${countrySummaryFragment}
  ${getCountriesQuery}
`;

export const GET_COUNTRY = gql`
  ${countrySummaryFragment}
  ${getCountryQuery}
`;
