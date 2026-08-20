import type { CodegenConfig } from '@graphql-codegen/cli';

const clientPreset = {
  preset: 'client',
  presetConfig: {
    fragmentMasking: false,
  },
  config: {
    useTypeImports: true,
  },
} as const;

const config: CodegenConfig = {
  generates: {
    'src/generated/': {
      schema: 'https://countries.trevorblades.com/',
      documents: [
        'src/graphql/fragments/country.fragment.graphql',
        'src/graphql/queries/countries.graphql',
        'src/graphql/queries/country.graphql',
      ],
      ...clientPreset,
    },
    'src/generated/posts/': {
      schema: 'https://graphqlzero.almansi.me/api',
      documents: [
        'src/graphql/fragments/post.fragment.graphql',
        'src/graphql/queries/posts.graphql',
        'src/graphql/mutations/**/*.graphql',
      ],
      ...clientPreset,
    },
  },
  ignoreNoDocuments: true,
};

export default config;
