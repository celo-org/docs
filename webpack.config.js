module.exports = {
  resolve: {
    fallback: {
      url: require.resolve("url/"),
      "process/browser": require.resolve("process/browser"),
    },
  },
};
