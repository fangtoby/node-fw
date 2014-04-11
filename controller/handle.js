 var formidable = require('formidable');
 var sys = require('sys');
 var fs = require('fs');
 var url = require('url');
 /*
	 	var arg = url.pase(req.url).query; //arg => age=100&id=2
		var param = querystring.parse() //param => { age :100 ,id :2}
*/
 function start(req, res) {
 	console.log('start');
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

 function news(req, res) {

 	console.log('news');
 	res.writeHead(200, {
 		'Content-Type': 'text/plain'
 	});
 	res.write('news');
 	res.end();
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
 			error(res,error);
 		} else {
 			res.writeHead(200, {
 				"Content-Type": "images/jpg"
 			});
 			res.write(file, 'binary');
 			res.end();
 		}
 	});
 }

 function error(res,error) {
 	res.writeHead(500, {
 		"Content-Type": "text/plain"
 	});
 	res.write(error + "\n");
 	res.end();
 }
 exports.start = start;
 exports.news = news;
 exports.upload = upload;
 exports.show = show;
 exports.error = error;