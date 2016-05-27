# node-fw

nodejs 后台应用框架
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
