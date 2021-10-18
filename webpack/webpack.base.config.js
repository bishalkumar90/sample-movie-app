const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const plugins = [
  new HtmlWebPackPlugin({
    inject: true,
    favicon: 'public/favicon.ico',
    template: path.join(process.cwd(), 'public/index.html'),
  }),
];

const resolve = {
  modules: [__dirname, "src", "node_modules"],
  extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  alias: {
    "react-dom": "@hot-loader/react-dom",
  },
}

const rules = [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,

      use: [
        // Used to convert jsx file into browser readable format
        // with the help of presets declared in .babelrc file
        'babel-loader'
      ]
    },
    {
      test: /\.png|svg|jpg|gif$/,
      use: [
        // Will be used to load files
        "file-loader"
      ],
    },
  ];

module.exports = options => ({
  mode: options.mode,
  entry: [path.join(process.cwd(), 'src/index.js')],
  output: options.output,
  devServer: options.devServer,
  resolve: {...resolve, ...options.resolve},
  module: {
    rules: options.module.rules.concat(rules),
  },
  plugins: options.plugins.concat(plugins),
});
