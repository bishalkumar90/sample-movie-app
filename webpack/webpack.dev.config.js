const path = require("path");

const port = process.env.PORT || 3000;

const plugins = [];

const rules = [
  {
    test: /\.s[ac]ss$/i, // sass/scss
    use: [
      // Will create style tag inside the html file
      "style-loader",
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  },
];

module.exports = require('./webpack.base.config')({
  mode: 'development',
  output: {
    filename: 'bundle.[hash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: port,
    hot:true,
    historyApiFallback: true,
    open: true,
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module:{
    rules
  },
  plugins,
});
