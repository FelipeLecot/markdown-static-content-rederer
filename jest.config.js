module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: [
    '<rootDir>/src/tests/**/*.test.ts',
    '<rootDir>/src/tests/**/*.test.ts',
  ],
  moduleFileExtensions: ["ts", "tsx", "js"],
};
