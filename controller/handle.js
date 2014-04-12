 var formidable = require('formidable');
 var sys = require('sys');
 var fs = require('fs');
 var url = require('url');
 var db = require('../db.js');
 /*
	 	var arg = url.pase(req.url).query; //arg => age=100&id=2
		var param = querystring.parse() //param => { age :100 ,id :2}
*/

 function start(req, res) {
 	console.log('start');
 	//db.init().add('insert into user vlaues()');
 	var body = '<form action="/handle/upload" enctype="multipart/form-data" ' +
 		'method="post">' +
 		'<input type="file" name="upload" multiple="multiple"><br>' +
 		'<input type="submit" value="Upload">' +
 		'</form>'
 	res.writeHead(200, {
 		'Content-Type': 'text/html'
 	});
 	res.write(body);
 	res.end();
 	// body...
 }

 function add(req, res) {
 	// body...
 	var data = Array();
 	for (var i = 0; i < 10000; i++) {
 		data.push('(' + i + ')');
 	}
 	var sql = data.join(',');
 	db.add('insert into consumertype(Description) values' + sql, function(error, result) {
 		if (!error) {
 			console.log(result);
 			res.writeHead(200, {
 				"Content-Type": "text/plain"
 			});
 			res.write('insert count ' + result['affectedRows'] + "\n");
 			res.end();
 		} else {
 			console.log(error);
 		}
 	});
 }

 function find(req, res) {
 	// body...
 	var now = new Date();
 	var startTime = now.getTime();
 	db.add('select * from consumertype where Description = 500', function(error, result) {
 		if (!error) {
 			var now = new Date();
 			var endTime = now.getTime();
 			res.writeHead(200, {
 				"Content-Type": "text/html"
 			});
 			res.write('t:'+startTime+'<br \>t:'+endTime+' select count ' + result.length + "\n");
 			res.end();
 		} else {
 			console.log(error);
 		}
 	})
 }

 function news(req, res) {
 	console.log('news');
 	db.sel('select * from financialmanagement.consumertype limit 0,1000', function(error, data, field) {
 		console.log(error);
 		if (!error) {
 			res.writeHead(200, {
 				'Content-Type': 'text/html'
 			});
 			var str = '<div>';
 			for (var item in data) {
 				console.log(data[item]);
 				for (var list in data[item]) {
 					if (list == 'id' || list == 'Description') {
 						str += "<div class='items'><b>" + list + "</b>:" + data[item][list] + "</div>";
 					}

 				}
 			}
 			str += '</div>';
 			res.write(str);
 			res.end();
 		} else {
 			error(res, error);
 		}
 	});

 	// body...
 }

 function upload(req, res) {
 	if (req.method.toLowerCase() == 'post') {
 		var form = new formidable.IncomingForm();
 		form.parse(req, function(err, fields, files) {
 			var name = "test";
 			try {
 				fs.renameSync(files.upload.path, '/www/tmp/' + name + '.jpg');
 			} catch (e) {
 				console.log(e);
 			}
 			res.writeHead(200, {
 				'Content-Type': 'text/html'
 			});
 			res.write('received upload:\n\n');
 			res.write("<img src='/handle/show?name=" + name + "' />");
 			res.end();
 			/*
 			sys.inspect({
 				fields: fields,
 				files: files
 			})
 			*/
 		});
 	}
 }

 function show(req, res) {
 	var arg = url.parse(req.url, true).query;

 	fs.readFile("/www/tmp/" + arg['name'] + ".jpg", 'binary', function(error, file) {
 		if (error) {
 			error(res, error);
 		} else {
 			res.writeHead(200, {
 				"Content-Type": "images/jpg"
 			});
 			res.write(file, 'binary');
 			res.end();
 		}
 	});
 }

 function error(res, error) {
 	res.writeHead(500, {
 		"Content-Type": "text/plain"
 	});
 	res.write(error + "\n");
 	res.end();
 }
 exports.add = add;
 exports.find = find;
 exports.start = start;
 exports.news = news;
 exports.upload = upload;
 exports.show = show;
 exports.error = error;