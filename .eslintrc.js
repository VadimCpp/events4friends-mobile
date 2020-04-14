module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    semi: 0,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "prettier/prettier": ["error", { "singleQuote": true }], // Use single quotes
  },
}
