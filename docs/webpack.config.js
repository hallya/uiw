const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const autoprefixer = require('autoprefixer');

const basePath = path.resolve(__dirname, '../');

const cssFilename = 'static/css/[name].[contenthash:8].css';

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

// const extractCSS = new ExtractTextPlugin('css/[contenthash].css');
// const extractLESS = new ExtractTextPlugin('css/[contenthash].css')

module.exports = {
  entry: {
    docs: path.join(basePath, 'docs')
  },
  output: {
    path: path.resolve(basePath, 'dist/site'),
    chunkFilename: '[chunkhash:12].js',
    filename: '[chunkhash:12].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '../docs'),
          path.join(__dirname, '../src'),
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
          },
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader',
      //     {
      //       loader: require.resolve('postcss-loader'),
      //       options: {
      //         ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
      //         plugins: () => [
      //           require('postcss-flexbugs-fixes'),
      //           autoprefixer({
      //             browsers: [
      //               '>1%',
      //               'last 4 versions',
      //               'Firefox ESR',
      //               'not ie < 9', // React doesn't support IE8 anyway
      //             ],
      //             flexbox: 'no-2009',
      //           }),
      //         ],
      //       },
      //     },
      //   ]
      // },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader : 'url-loader'
      },
      {
        test: /\.md$/,
        loader : 'raw-loader'
      }
    ]
  },

  plugins: [
    // extractLess,
    new HtmlWebpackPlugin({
      inject: true,
      // inject: "head",
      template: './build.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2,
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'inline',
    //   filename: 'js/[hash:8].[name].js',
    //   minChunks: Infinity
    // }),
    // new webpack.optimize.AggressiveSplittingPlugin({
    //     minSize: 3000,
    //     maxSize: 8000
    // }),
  ]
};
