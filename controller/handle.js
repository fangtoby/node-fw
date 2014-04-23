var formidable = require('formidable');
var sys = require('sys');
var fs = require('fs');
var url = require('url');
var db = require('../extends/db.js');
var Model = require('../extends/model.js');
/*
    var arg = url.pase(req.url).query; //arg => age=100&id=2
    var param = querystring.parse() //param => { age :100 ,id :2}
*/
module.exports = {
    index: function() {
        this.res.render('index', {
            'age': 234,
            'Date': new Date().getTime(),
            'infor': JSON.stringify(this.req.headers)
        });
    },
    form: function() {
        // body...
        this.res.render('form', {
            'time': new Date(),
        });
    },
    menu: function() {
        // body...
        this.res.render('menu', {
            'time': new Date(),
        });
    },
    model: function() {
        // body...
        this.res.render('model', {
            'time': new Date(),
        });
    },
    view: function() {
        // body...
        this.res.render('view', {
            'time': new Date(),
        });
    },
    start: function() {
        // body...
        var body = '';
        this.res.render('start', {
            'time': new Date(),
        });
    },
    add: function() {
        // body...
        var self = this;
        var data = Array();
        for (var i = 0; i < 10000; i++) {
            data.push('(' + i + ')');
        }
        var sql = data.join(',');
        db.add('insert into consumertype(Description) values' + sql, function(error, result) {
            if (!error) {
                console.log(result);
                self.res.render('add', {
                    'time': new Date(),
                    'content': 'insert count ' + result['affectedRows'] + "\n",
                });
            } else {
                console.log(error);
            }
        });
    },
    find: function() {
        var self = this;
        var now = new Date();
        var startTime = now.getTime();
        var name = self.res.param;

        Model.init('user').findByPK(1, function(error, result) {
            if (error) {
                throw new Error(error);
            } else {
                console.log('findByPk');
                console.log(result);
            }
        });

        Model.init('user').getColumns(function(error, result) {
            console.log(result);
        });

        Model.init('user').deleteByAttribute({
            uid: 9
        }, function(error, result) {
            if (!error) {
                console.log(result);
            } else {
                throw new Error(error);
            }
        }).findByAttribute({
            'achievement': 1
        }, function(error, result) {
            if (!error) {
                var now = new Date();
                var endTime = now.getTime();

                var content = 't:' + startTime + '<br \>t:' + endTime + ' select count ' + result.length;
                self.res.render('find', {
                    'age': 12,
                    'pcontent': content,
                    'result': result,
                    'infor': JSON.stringify(self.req.headers),
                });
            }
        });
        // db.find('select * from user where name = "'+name.name+'"', function(error, result) {

        // db.find('select * from user', function(error, result) {
        //     if (!error) {
        //         var now = new Date();
        //         var endTime = now.getTime();

        //         var content = 't:' + startTime + '<br \>t:' + endTime + ' select count ' + result.length;
        //         self.res.render('find', {
        //             'age': 12,
        //             'pcontent': content,
        //             'result': result,
        //             'infor': JSON.stringify(self.req.headers),
        //         });
        //     } else {
        //         console.log(error);
        //     }
        // });
    },
    news: function() {
        console.log('news');
        var self = this;
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
                self.res.render('news', {
                    'content': str,
                });
            } else {
                self.res.error(error);
            }
        });
    },
    upload: function() {
        var self = this;
        if (self.req.method.toLowerCase() == 'post') {
            var form = new formidable.IncomingForm();
            form.parse(self.req, function(err, fields, files) {
                var name = "test";
                try {
                    fs.renameSync(files.upload.path, '/www/tmp/' + name + '.jpg');
                } catch (e) {
                    console.log(e);
                }
                var str = "<img src='/handle/show?name=" + name + "' />";
                self.res.render('upload', {
                    'str': str
                });
                /*
                sys.inspect({
                fields: fields,
                files: files
                })
                */
            });
        }
    },
    show: function() {
        var self = this;
        var arg = url.parse(self.req.url, true).query;

        fs.readFile("/www/tmp/" + arg['name'] + ".jpg", 'binary', function(error, file) {
            if (error) {
                self.res.render('error', {
                    'error': error
                });
            } else {
                self.res.render('images', {
                    'file': file
                });
            }
        });
    },
};