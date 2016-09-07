'use strict'

module.exports = {
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
			},
		],
	},
	output: {
		path: './dist',
		library: process.env.npm_package_config_library,
		libraryTarget: 'umd',
	},
}
