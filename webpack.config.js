const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATH = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
}

const CommonConfig = {
	entry: {
		app: PATH.app,
	},

	output: {
		path: PATH.build,
		filename: '[name].js',
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'this is my first webpack test',
		}),
	],
}

// 配置项
const developmentConfig = Object.assign({}, CommonConfig, {
	devServer: {
		historyApiFallback: true,
		// 报错类型：只有报错时才显示错误
		stats: 'errors-only',
		port: process.env.PORT,
		host: process.env.HOST,
		// 当服务器发现错误，显示在页面上
		overlay: {
			errors: true,
			warnings: true
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			// 打包之前出错不进行打包，节省性能
			enforce: 'pre',
			loader: 'eslint-loader',
			options: {
				emitError: true,
				emitwarning: true
			}
		}]
	}
})

const productionConfig = CommonConfig

module.exports = env => (env === 'production' ? productionConfig : developmentConfig)
