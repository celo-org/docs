const path = require('path');

module.exports = function (context, options) {
  return {
    name: 'aliases',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            '@components': path.resolve(__dirname, '../../src/components/'),
          }
        }
      }
    }
  }
}
