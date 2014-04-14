var spawn = require('child_process').spawn,
    server = null;


function startServer(){
    console.log('start server');
    server = spawn('../node_modules/nodemon/bin/nodemon.js',['app.js']);
    console.log('node js pid is '+server.pid);
    server.on('close',function(code,signal){
        server.kill(signal);
        server = startServer();
    });
    server.on('error',function(code,signal){
        server.kill(signal);
        server = startServer();
    });
    server.stderr.on('data',function  (argument) {
        // body...
        console.log(argument.toString());
    });
    server.stdout.on('data',function  (argument) {
        // body...
        console.log(argument.toString());
    });
   return server;
};

startServer();