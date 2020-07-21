const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/template.html",
                minify: {
                    removeAttributeQuotes: true,
                    removeComments: true,
                    collapseWhitespace: true
                }
            })
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css",
            chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 3. Extract CSS into files
                    MiniCssExtractPlugin.loader,
                    // 2. translates CSS into CommonJS
                    'css-loader',
                    // 1. Compiles Sass to CSS
                    'sass-loader',
                ]
            }
        ]
    },
});