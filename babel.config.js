// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          path: '.env',
          safe: true,
          whitelist: null,
          blacklist: null,
          moduleName: '@env',
          allowUndefined: true,
        },
      ],
    ],
  };
};
