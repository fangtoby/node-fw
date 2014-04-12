(function() {
	//Create Web Server 
	var http = require('http');
	var url = require('url');
	var router = require('./router.js');

	http.createServer(function(req, res) {
		//
		var pathName = url.parse(req.url).pathname;
		//
		console.log("Request for " + pathName + " received");

		router.route(pathName, req, res);

	}).listen(8001, '127.0.0.1');

	console.log('Server running at http://127.0.0.1,port is 8001');
	/*
	 var net = require('net');
	 var server = net.createServer(function(socket){
		socket.write('Echo Server\r\n');
		socket.pipe(socket);
		 });

	 server.listen(8001,'192.168,2.62');
	 */
})();