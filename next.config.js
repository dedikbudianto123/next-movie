/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  webpack: (config, { webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.plugins.push(new StylelintPlugin());

    return config;
  }
};
