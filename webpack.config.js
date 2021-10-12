const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (isProd) {
		config.minimizer = [
			new CssMinimizerWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config
}

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader
		},
		'css-loader'
	]

	if (extra) {
		loaders.push(extra)
	}

	return loaders
}

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const plugins = () => {
  const base = [
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets/img/favicon/favicon.ico'),
					to: path.resolve(__dirname, 'dist')
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: fileName('css'),
		}),
		new ESLintPlugin()
	]

	if (isProd) {
		base.push(new BundleAnalyzerPlugin())
	}

	return base
}

const babelOptions = preset => {
	const opt = {
		presets: [
			'@babel/preset-env'
		],
		plugins: [
			'@babel/plugin-proposal-class-properties'
		]
	}

	if (preset) {
		opt.presets.push(preset)
	}

	return opt
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.jsx'],
		analytics: './analytics.ts',
	},
	output: {
		filename: fileName('js'),
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.png', '.css', '.scss'],
		alias: {
			'@models': path.resolve(__dirname, 'src/models'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@style': path.resolve(__dirname, 'src/assets/scss'),
			'@images': path.resolve(__dirname, 'src/assets/img'),
		}
	},
	optimization: optimization(),
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
	},
	devtool: isDev ? 'source-map' : 'hidden-source-map',
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: cssLoaders()
			},
			{
				test: /\.s[ac]ss$/i,
				use: cssLoaders('sass-loader')
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)&/i,
				type: 'asset/resource'
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
				  loader: 'babel-loader',
				  options: babelOptions()
				}
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-react')
				}
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-typescript')
				}
			},
		]
	}
}
