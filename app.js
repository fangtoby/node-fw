/*
 *  1 路由模块 实现
 *	2 数据库操作模块 实现
 *	3 自动生成文件模块 实现
 *	4 根据路由参数,获取加载相应控制器模块 实现
 * 	5 视图渲染模块 实现 html,javascript,css,ico
 *  6 访问日志模块 实现
 *
 *  7 mvc controller模块实现
 *  8 mvc view 模块 实现
 *  9 mvc model 模块 未实现
 *	10 使用配置文件 实现
 */
(function() {
	//Create Web Server 
	var http = require('http');
	var url = require('url');
	var router = require('./extends/router.js');
	var os = require('os');
	
	var ifaces = os.networkInterfaces();
	var localIpAddress = '';
	for (var dev in ifaces) {
		var alias = 0;
		ifaces[dev].forEach(function(details) {
			if (details.family == 'IPv4') {
				if (dev == 'en1') {
					localIpAddress = details.address;
				}
				console.log(dev + (alias ? ':' + alias : ''), details.address);
				++alias;
			}
		});
	}
	console.log(localIpAddress);
	http.createServer(function(req, res) {
		//
		res.param = url.parse(req.url, true).query;
		res.config = require('./main/config.js');
		res.render = require('./extends/render.js')

		var pathName = url.parse(req.url).pathname;
		//
		console.log("Request for " + pathName + " received");

		router.route(pathName, req, res);

	}).listen(8001, localIpAddress);

	console.log('Server running at ' + localIpAddress + ',port is 8001');
	/*
	 var net = require('net');
	 var server = net.createServer(function(socket){
		socket.write('Echo Server\r\n');
		socket.pipe(socket);
		 });

	 server.listen(8001,'192.168,2.62');
	 */
})();