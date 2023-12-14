const path = require('path');

module.exports = {
  // ... otras configuraciones de webpack ...

  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
    },
  },
};
