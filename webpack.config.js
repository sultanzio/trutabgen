const MiniCssExtract = require('mini-css-extract-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/, /server/],
				use: ['babel-loader']
			},
			{
				test: /\.s?css$/,
				use: ['style-loader', MiniCssExtract.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new MiniCssExtract({ filename: 'styles.css' })
	],
	output: { 
		filename: 'bundle.js' 
	},
	devServer: {
		contentBase: './dist'
	}
};