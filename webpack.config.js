var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
var entry = PRODUCTION 
	? [ './src/index.js' ]
	: [
		'./src/index.js',
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080'
	];

var plugins = PRODUCTION
	? [
		new webpack.optimize.UglifyJsPlugin({
			// comments: true,
			// mangle: false,
			// compress: {
			// 	warnings: true
			// }
		}),
		new ExtractTextPlugin('style-[contenthash:10].css'),
		new HTMLWebpackPlugin({
			template: 'index-template.html',
			minify: {
				collapseWhitespace: true
			}
		})
	 ]
	: [ new webpack.HotModuleReplacementPlugin() ];

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION
	? ExtractTextPlugin.extract({
		use: ['css-loader', 'sass-loader?localIdentName=' + cssIdentifier]
 	})
 	: ['style-loader', 'css-loader', 'sass-loader?localIdentName=' + cssIdentifier]

module.exports = {
	// externals: {
	// 	'jquery': 'jQuery'
	// },
	devtool: 'source-map',
	entry: entry,
	plugins: plugins,
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: PRODUCTION ? '/' : '/dist/',
		filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: ['babel-loader'],
			exclude: /node_modules/
		}, {
			test: /\.(png|jpg|gif)$/,
			use: ['url-loader?limit=216000&name=images/[hash:12].[ext]'],
			exclude: /node_modules/
		},{
			test: /\.(css|scss)$/,
			use: cssLoader,
			exclude: /node_modules/
		}]
	}
};