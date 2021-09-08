const Dotenv = require('dotenv-webpack');

module.exports = {
    configureWebpack: {
        plugins: [
	    new Dotenv()
        ]
	},
	devServer: {
		port: 8080,
		proxy: {
			'^/': {
				target: "http://localhost:5000",
				changeOrigin: true,
				logLevel: 'debug',
				pathRewrite: { '^/': '/' },
			},
		}
	}
};
