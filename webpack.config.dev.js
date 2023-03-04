const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: './src/index.js',
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  
  watch: true,
  watchOptions: {
    ignored: '/node_modules/'
  },

  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
            "style-loader", 
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true
              }
            }, 
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    compress: false,
    historyApiFallback: true,
    hot: true,
    port: 3000
  }
};