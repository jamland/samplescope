const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require('path');

rules.push(
  {
    test: /\.(woff|woff2|eot|ttf)$/,
    loader: 'url-loader?limit=100000',
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
    exclude: /node_modules/,
  },
  {
    test: /\.(png|jpe?g|gif|jp2|webp)$/,
    loader: 'url-loader',
    options: {
      name: 'images/[name].[ext]',
      // Inline images smaller than 100kb as data URIs
      limit: 150000,
    },
  }
  // {
  //   test: /\.(?:png|jpg|svg)$/,
  //   loader: 'url-loader',
  //   query: {
  //     // Inline images smaller than 100kb as data URIs
  //     limit: 100000,
  //   },
  // }
);

module.exports = {
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
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
  plugins: plugins,
};
