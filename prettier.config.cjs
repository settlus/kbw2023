/** @type {import("prettier").Config} */
module.exports = {
  endOfLine: 'lf',
  arrowParens: 'always',
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  tailwindConfig: './tailwind.config.cjs',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^~/env(.*)$',
    '^~/types/(.*)$',
    '^~/config/(.*)$',
    '^~/lib/(.*)$',
    '^~/hooks/(.*)$',
    '^~/components/ui/(.*)$',
    '^~/components/(.*)$',
    '^~/styles/(.*)$',
    '^~/app/(.*)$',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: [require.resolve('prettier-plugin-tailwindcss'), '@ianvs/prettier-plugin-sort-imports'],
}
