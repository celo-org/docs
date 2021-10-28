process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

// TODO idk where the webpack config is located
const webpackConfigProd = require('@docusaurus/core/w')('production');

// Add Bundle Analyzer to the 'hidden' React webpack config for production
webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());

// Run webpack with the new config
webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});
