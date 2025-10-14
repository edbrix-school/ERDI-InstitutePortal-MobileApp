const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable Expo Router here
config.resolver.sourceExts.push('mjs');
config.transformer.unstable_allowRequireContext = true;

module.exports = config;
