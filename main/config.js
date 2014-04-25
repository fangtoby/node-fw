module.exports = {
	version: '1.0',
	basePath: '',
	language: 'en',
	timeZone: 'Asia/Shanghai',
	viewCodeTag: /<%(.*?)%>/g,
	viewLayouts: 'main.html',
	autoIncludePath: [
		'controller',
		'model',
		'components',
		'extends',
	],
	db: {
		main: {
			'host': '127.0.0.1',
			'user': 'root',
			'password': 'root',
			'database': 'km',
			debug: false,
		},
		slave: {
			'host': '127.0.0.1',
			'user': 'root',
			'password': 'root',
			'database': 'km',
			debug: false,
		},
		cache: {
			'host': '127.0.0.1',
			'user': 'root',
			'password': 'root',
			'database': 'km',
			debug: false,
		}
	},
	log: {
		status: true
	}
};