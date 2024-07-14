module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry', // or 'usage' if you prefer
      corejs: { version: 3, proposals: true },
    }],
  ],
};
