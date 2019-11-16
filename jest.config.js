module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        'warnOnly': true,
      },
    },
  },
  roots: [
    '<rootDir>',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
