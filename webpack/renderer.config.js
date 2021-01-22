const rules = require('./rules');
const plugins = require('./plugins');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

rules.push({
  test: /src(\/|\\)renderer(\/|\\)index\.scss$/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'precss',
            'autoprefixer'
          ]
        }
      }
    },
    {
      loader: 'sass-loader'
    }
  ],
});
rules.push({
  test: /\.(css|scss)$/,
  include: /src(\/|\\)renderer(\/|\\)presentation/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    { loader: 'css-loader',
      options: {
        modules: {
          localIdentName: mode === 'production' ?
          '[hash:base64]' : '[path][name]-[local]-[hash:base64:5]'
        }
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'precss',
            'autoprefixer'
          ]
        }
      }
    },
    {
      loader: 'sass-loader'
    }
  ],
});

plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].bundle.css',
    chunkFilename: '[id].css'
  })
);

module.exports = {
  mode,
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};
