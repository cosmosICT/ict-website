const path = require('path');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					context: path.resolve(__dirname, "dist"),
					from: path.join(__dirname, '/src/index.html'),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				type: "asset/resource",
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	optimization: {
		minimizer: [
			new HtmlMinimizerPlugin({
				minimizerOptions: {
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
			new CssMinimizerPlugin(),
		],
	},
	mode: 'production',
	devtool: 'source-map'
};