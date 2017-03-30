var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'; //true or false
const cssIdentifier = isProd ? '[hash:base64:10]' : '[path][name]---[local]';
const cssDev = ['style-loader', 'css-loader?localIdentName=' + cssIdentifier, 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
        use: ['css-loader?localIdentName=' + cssIdentifier,  'sass-loader']
});
const cssConfig = isProd ? cssProd : cssDev;

var plugins = {
    commons: [
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require('./build/vendor-manifest.json'),
        }),
        new HTMLWebpackPlugin({
            template: './index-template.html',
            // commons should be included before app, 
            // but html webpack plugin will take care of this.
            chunks: ['app', 'commons'], 
            minify: {
                collapseWhitespace: isProd
            }
         }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons'
        }),
        new AddAssetHtmlPlugin({
            includeSourcemap: !isProd,
            hash: true,
            filepath: require.resolve('./build/vendor.dll.js'),
        }),
    ],
    prod: [
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            //comments: true,
            //mangle: false,
            //compress: {
            //    warnings: true
            //}
        }),
        new ExtractTextPlugin('style-[contenthash:10].css'),
        new FaviconsWebpackPlugin('./my-logo.jpg')
    ],
    dev: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};

module.exports = {
    entry: {
        app: './src/index.js',
        about: './src/about.js',
        commons: ['react', 'react-dom']
    },
//  externals: {
//      'jquery': 'jQuery'
//  },
    devtool: 'source-map',
    plugins: plugins.commons.concat(isProd ? plugins.prod : plugins.dev),
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: isProd ? '[name].bundle.[hash:12].min.js' : '[name].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        stats: 'errors-only'
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
            use: cssConfig,
            exclude: /node_modules/
        }]
    }
};
