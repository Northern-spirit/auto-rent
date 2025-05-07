const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Отключаем строгую проверку package exports, чтобы избежать ошибок с импортами
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
