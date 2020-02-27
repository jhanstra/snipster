module.exports = 
  entry: '$1',
  output: {
    filename: '$2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style!css!sass'
      }
    ]
  }
}
