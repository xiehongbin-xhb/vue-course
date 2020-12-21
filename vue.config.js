const path = require('path');
const resolve = dir => path.join(__dirname, dir);

const BASE_URL = process.env.NODE_ENV === 'production' ? '/ivew/admin': '/'
module.exports = {
	lintOnSave: false,
	publicPath: BASE_URL,
	chainWebpack: config => {
		config.resolve.alias
			.set('@',resolve('src')) // @符号就代表src文件夹
			.set('_c',resolve('src/components'))
	},
	// 打包时不生成 .map文件
	productionSourceMap: false,
	// 跨域配置：
	devServer:{
		proxy: 'http://localhost:4000'
	}
}
