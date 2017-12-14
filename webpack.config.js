var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var DEV = process.env.NODE_ENV;
let miniCss = {};
let precss = require('precss');
let px2rem = require('postcss-px2rem');

const resolve = (name) => {
  return path.resolve(__dirname, name);
};

let plugins = [
  new ExtractTextPlugin({
    filename: '[name].css',
    disable: false,
    allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new webpack.ProvidePlugin({
    // $: "zepto"
  })
];


if (DEV == 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comment: false,
      },
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      },
      beautify: false,
      sourceMap: false
    })
  );
  miniCss = {
    minimize: true
  }
}



module.exports = {
  devtool: 'source-map',
  entry: {
    vendor: [ 'babel-polyfill'],    
    'main': './main.js',    
  },
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: 'build/',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: '/node_modules/',
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }

    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader'],
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        //resolve-url-loader may be chained before sass-loader if necessary
        use: [{
          loader: 'css-loader',
          options: miniCss
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer,
              precss
            ]
          }        
        }, {
          loader: 'px2rem-loader',
          options: {
            baseDpr: 2, // dpr基准
            remUnit: 75 / 2, // rem 基准，由设计稿决定（750/10）
            remPrecision: 6, // rem 精确位数
          }
        }, {    
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            modules: true,
          }
        }]
      })
    }, {
      test: /\.(png|gif|jpg|svg|ico)$/,
      loader: 'url-loader',
      options: {
        limit: 1024,
        //name: 'static/images/[hash].[ext]'
      }
    }, {
      test: /\.(woff|woff2|eot|ttf)\??.*$/,
      loader: 'url-loader',
      options: {
        limit: 50000,
        name:'[path][name].[ext]'        
      }
    }]
  },
  externals: {     
    // '$': 'zepto',    
  },
  resolve: {
    extensions: ['.js', '.css', '.scss'],
    modules: [
      resolve('node_modules'),
      resolve('src'),
    ],
    alias: {      
      'utils': resolve('src/utils/'),     
    }
  },
  plugins: plugins,
  devServer: {
    contentBase: './',
    hot: false,
    noInfo: false,
    historyApiFallback: true
  }
}