/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  roots: ["<rootDir>/tests"],

  testMatch: [
    '<rootDir>/tests/**/*.spec.ts'
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  }
};