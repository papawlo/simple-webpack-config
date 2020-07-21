var HtmlWebpackPlugin = require('html-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
const glob = require('glob');


module.exports = {
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js",
    },
    plugins: [
        ImageminPlugin({
            externalImages: {
                context: 'src', // Important! This tells the plugin where to "base" the paths at
                sources: glob.sync('src/assets/images/**/*.{svg|png|jpe?g|gif}'),
                destination: 'dist/public/images',
                fileName: '[path][name].[ext]' // (filePath) => filePath.replace('jpg', 'webp') is also possible
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'imgs'
                    }
                }
            }
        ]
    }
};