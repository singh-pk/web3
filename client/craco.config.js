const webpack = require('webpack');
const { getLoader, loaderByName } = require('@craco/craco');
const path = require('path');
const fs = require('fs');

const packages = [];
const rootPath = path.join(__dirname, '..');

packages.push(path.join(rootPath, 'common'));

const solanaDirs = fs.readdirSync(path.join(rootPath, 'solana'));

for (const x of solanaDirs) {
  packages.push(path.join(rootPath, 'solana', x, 'app'));
  packages.push(path.join(rootPath, 'solana', x));
}

module.exports = {
  webpack: {
    configure: webpackConfig => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader')
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat(packages);
      }
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          crypto: false,
          stream: false,
          buffer: require.resolve('buffer')
        },
        symlinks: true
      };
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer']
        })
      );
      console.log(webpackConfig);
      return webpackConfig;
    }
  }
};
