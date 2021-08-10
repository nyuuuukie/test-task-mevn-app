module.exports = {
	devServer: {
		proxy: {
			'^/query': {
				target: "http://localhost:5000",
				changeOrigin: true,
				logLevel: 'debug',
				pathRewrite: { '^/query': '/' },
			},
		}
	}
}