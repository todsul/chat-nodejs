var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry: {
        script: "./client/client.js",
        styles: "./styles/styles.js"
    },
    output: {
        path: './public/js',
        filename: 'scripts.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'jsx?stripTypes'
        },
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        }]
    },
    plugins: [
        new ExtractTextPlugin('../css/styles.css')
    ]
};

module.exports = config;
