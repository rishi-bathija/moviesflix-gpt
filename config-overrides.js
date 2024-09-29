const webpack = require("webpack")

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};

    Object.assign(fallback, {
        process: require.resolve("process/browser"),
        buffer: require.resolve("buffer/"),
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        fs: false,
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        net: false,
    });

    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),
    ]);
    return config;
};