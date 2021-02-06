/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  webpack: (config, { webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.plugins.push(new StylelintPlugin());
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new Visualizer({
          filename: './stats/statistics.html'
        })
      );
    }

    return config;
  }
};

module.exports = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})(nextConfig);
