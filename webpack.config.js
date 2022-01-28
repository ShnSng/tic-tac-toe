const { join, resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const PACKAGE = require('./package.json');

module.exports = (env, argv) => {
  const config = {
    entry: join(__dirname, 'src', 'index.jsx'),
    output: {
      path: resolve(__dirname, 'dist'),
      filename: `index.js?v=${PACKAGE.version}`,
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: [
                    tailwindcss,
                    autoprefixer,
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: join(__dirname, 'public', 'index.html'),
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(argv.mode),
        },
      }),
    ],
    optimization: {
      minimize: argv.mode === 'production',
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
  };
  return config;
};
