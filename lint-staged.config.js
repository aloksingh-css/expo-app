const config = {
  '*.{js,jsx,ts,tsx}': ['eslint --max-warnings 0'],
  '*.{js,jsx,ts,tsx,json,css,md}': ['prettier --check --log-level error'],
};

export default config;

