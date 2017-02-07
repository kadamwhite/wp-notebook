const { resolve } = require('path');
const webpack = require('webpack');
const findCacheDir = require('find-cache-dir');
const objectHash = require('node-object-hash');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',

  context: resolve(__dirname, 'src'),

  entry: [
    './index.jsx',
  ],

  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),
  },

  externals: {
    WP_API_Settings: 'WP_API_Settings'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/react-scripts/
              // directory for faster rebuilds. We use findCacheDir() because of:
              // https://github.com/facebookincubator/create-react-app/issues/483
              cacheDirectory: findCacheDir({
                name: 'react-scripts'
              })
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path]--[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader', // See postcss.config.js for options
            },
            {
              loader: 'stylus-loader',
            }
          ],
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader?limit=10000'
      }
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),

    // Minimize
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    // Use hard source caching for faster rebuilds
    new HardSourceWebpackPlugin({
      cacheDirectory: resolve(__dirname, '.cache/webpack-source/[confighash]'),
      recordsPath: resolve(__dirname, '.cache/webpack-source/[confighash]', 'records.json'),

      // Build a string value used by HardSource to determine which cache to
      // use if [confighash] is in cacheDirectory, or if the cache should be
      // replaced if [confighash] does not appear in cacheDirectory.
      configHash: (webpackConfig) => objectHash().hash(webpackConfig)
    }),
  ],

};
