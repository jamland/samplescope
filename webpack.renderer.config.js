const Dotenv = require('dotenv-webpack');
const rules = require('./webpack.rules');
const path = require('path');

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
    exclude: /node_modules/,
  },
  {
    test: /\.tsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.(?:png|jpg|svg)$/,
    loader: 'url-loader',
    query: {
      // Inline images smaller than 10kb as data URIs
      limit: 10000,
    },
  }
);

module.exports = {
  // entry: ['babel-polyfill'],
  module: {
    rules,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    // don't forget update jsconfig.json
    alias: {
      '~': path.resolve(__dirname, 'src/renderer'),
      '@modules': path.resolve(__dirname, 'src/modules/'),
      '@components': path.resolve(__dirname, 'src/renderer/components/'),
      '@hooks': path.resolve(__dirname, 'src/renderer/hooks/'),

      // React Profiler
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)w
    }),
  ],
};
