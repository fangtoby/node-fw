/*
 *	1 路由模块 实现
 *	2 数据库操作模块 实现
 *	3 自动生成文件模块 实现
 *	4 根据路由参数,获取加载相应控制器模块 实现
 *	5 视图渲染模块 实现 html,javascript,css,ico
 
 *	6 访问日志模块 实现
 *	7 mvc controller模块实现
 *	8 mvc view 模块 实现
 *	9 mvc model 模块 未实现 x
 *	10 使用配置文件 实现
 
 *	11 封装框架 未实现 x
 *	12 设置请求超时 实现
 *	13 实现守护进程 实现
 *	14 使用压力测试工具siege 测试服务 发现系统性能瓶颈 实现优化
 *		a: 请求超时处理 实现
 *		b: 错误跳转处理 实现
 *		c: fs 文件读写瓶颈，解决方案，实现在生产环境中 实现文件缓存 未实现 x
 *		d: mysql 数据库链接问题 未清晰
 *		e: 使用缓存数据库缓存 数据 未实现
 *	15 未知问题 系统稳定性
 *	16 缓存静态文件 防止频繁访问i/o 系统性能优化提升
 *		a: 初步实现 缓存视图文件
 *		b:
 *
 */
(function() {
	var http = require('http'),
		url = require('url'),
		crypto = require('crypto'),
		router = require('./extends/router'),
		config = require('./main/config'),
		render = require('./extends/render'),
		mtil = require('./extends/util'),
		cache = require('./extends/cache'),
		localIpAddress = mtil.getIpAddress();
	//cache viem
	cache.start('./view');
	//
	var async = require('async');
	async.each([1,2,3],function() {
		// body...
		console.log(arguments);
	},function() {
		// body...
		conole.log(arguments);
		console.log('down');
	});
	async.eachSeries([42,53,64],function () {
		// body...
		console.log(arguments);
		console.log(arguments[1]);
	},function() {
		// body...
		console.log(arguments);
	});
	//
	var momery = 1;

	http.createServer(function(req, res) {
		//
		console.log(momery++);

		res.param = url.parse(req.url, true).query;
		res.config = config;
		res.render = render;
		//set Request Timeout
		req.socket.removeAllListeners('timeout');
		req.socket.setTimeout(15000);
		req.socket.on('timeout', function() {
			console.log('socket timeout');
			res.render('error', 'Request timeout.');
			return;
		});
		var pathName = url.parse(req.url).pathname;
		var cookieInfo = {};
		req.headers.cookie && req.headers.cookie.split(';').forEach(function(cookie) {
			var part = cookie.split('=');
			console.log('cookie.....');
			console.log(part[0].trim() + (part[1] || '').trim());
			cookieInfo[part[0]] = part[1];
		});
		console.log(req.headers.cookie);
		if ('undefined' != (typeof cookieInfo.userInfo)) {
			console.log("cookie user information" + cookieInfo['userInfo']);
		} else {
			var md5 = crypto.createHash('md5');
			var password = md5.update(momery + "nodejs").digest('base64');
			res.setHeader('Set-Cookie', 'userInfo = ' + password + ';path=/;');
		}

		if (cache.cacheStatus) {
			var routes = pathName.split('/');
			var _controller = routes[1];
			var _action = routes[2] ? routes[2] : 'index';
			var path = './view/' + _controller + '/' + _action + '.html';
			console.log(path);
			res.cacheView = cache.getFromCache(path);
		}
		console.log("Request for " + pathName + " received");
		try {
			router.route(pathName, req, res);
		} catch (e) {
			res.render('error', e);
		}
	}).listen(8001, localIpAddress);

	console.log('Server running at ' + localIpAddress + ',port is 8001');

})();
/*
   var net = require('net');
   var server = net.createServer(function(socket){
   	socket.write('Echo Server\r\n');
   	socket.pipe(socket);
   });
server.listen(8001,'192.168,2.62');
格式代码
astyle --style=ansi *.js

启动服务，运用守护进程
sudo node spawn.js

启动服务
../node_modules/nodemon/bin/nodemon.js app.js

统计代码的行数
find ./ -name "*.js" |xargs cat | wc -l
测试服务器负载 网站性能
http://www.oschina.net/question/223693_44078

brew install siege
sudo ln -s /usr/local/Cellar/siege/3.0.5/bin/siege /usr/bin/siege
/usr/bin/siege -r10 -c100 http://192.168.1.105:8001/handle/find

Transactions:		        1000 hits
Availability:		      100.00 %
Elapsed time:		        6.66 secs
Data transferred:	        2.83 MB
Response time:		        0.01 secs
Transaction rate:	      150.15 trans/sec
Throughput:		        0.42 MB/sec
Concurrency:		        0.86
Successful transactions:        1000
Failed transactions:	           0
Longest transaction:	        0.07
Shortest transaction:	        0.00

fs的性能问题
/usr/bin/siege -r100 -c1000 http://192.168.1.105:8001/handle/index
return binding.open(pathModule._makeLong(path), stringToFlags(flags), mode);
^
Error: EMFILE, too many open files './view/handle/index.html'
尽量缓存数据，避免在应用中频繁读写io文件数据
*/
