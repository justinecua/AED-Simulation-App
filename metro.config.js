// metro.config.js
const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  dgram: require.resolve('react-native-udp'),
  stream: require.resolve('stream-browserify'),
  buffer: require.resolve('buffer/'),
  events: require.resolve('events/'),
};

module.exports = config;
