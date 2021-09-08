const Dotenv = require('dotenv-webpack');

module.exports = {
    configureWebpack: {
        plugins: [
	    new Dotenv()
        ]
	},
	devServer: {
        proxy: 'http://localhost:5000',	
    }
};
