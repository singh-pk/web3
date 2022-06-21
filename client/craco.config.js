const { getLoader, loaderByName } = require('@craco/craco');

module.exports = {
  webpack: {
    configure: webpackConfig => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader')
      );

      if (isFound) {
        match.loader.include = undefined;
      }

      webpackConfig.resolve.fallback = {
        crypto: false,
        stream: false
      };

      return webpackConfig;
    }
  }
};
