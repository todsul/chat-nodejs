var config = {
    entry: './app/app.js',
    output: {
        path: './public/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'jsx'
        },
        {
            test: /\.less$/,
            loader: 'style!css!less'
        }]
    }
};

module.exports = config;
