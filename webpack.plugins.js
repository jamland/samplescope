const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const assets = ['images', 'fonts'];
// const pathToCopyAssetsFrom = 'src/renderer';
// const pathToCopyAssetsTo = '.webpack/renderer';

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new Dotenv({
    path: './.env', // Path to .env file (this is the default)
    safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
  }),
  // ...assets.map((asset) => {
  //   return new CopyWebpackPlugin({
  //     patterns: [
  //       {
  //         from: path.resolve(__dirname, pathToCopyAssetsFrom, asset),
  //         to: path.resolve(__dirname, pathToCopyAssetsTo, asset),
  //       },
  //     ],
  //   });
  // }),
];
