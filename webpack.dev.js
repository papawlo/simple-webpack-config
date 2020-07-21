const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    context: path.resolve(__dirname, "scr"),
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 3. Creates `style` nodes from JS strings
                    { loader: 'style-loader' },
                    // 2. Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            ident: 'postcss',
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    // 1. Compiles Sass to CSS
                    {
                        loader: 'sass-loader', options: { sourceMap: true }
                    }
                ]
            },
        ]
    }
});