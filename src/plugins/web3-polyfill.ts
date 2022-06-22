const webpack = require("webpack");

module.exports = function(context, options) {
  return {
    name: "web3-polyfill",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            os: require.resolve("os-browserify/browser"),
            crypto: require.resolve("crypto-browserify"),
            assert: require.resolve("assert"),
            stream: require.resolve("stream-browserify"),
            fs: false,
            net: false,
          },
        },
        plugins: [
          new webpack.ProvidePlugin({
            Buffer: [require.resolve("buffer"), "Buffer"],
            process: "process/browser",
          }),
          new webpack.IgnorePlugin({
            resourceRegExp: /^electron$/,
          }),
        ],
      };
    },
  };
};
