export default {
  "src/**/*.{ts,tsx}": [
    "tsc --noEmit --esModuleInterop",
    "eslint --fix",
    "prettier --write"
  ]
};