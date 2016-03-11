var http = require('http');
var Jserver = require('./jserver.js');

function start() {
	var jserver = new Jserver();
	http.createServer(jserver.serveJsByStream).listen(8888);
	// http.createServer(jserver.serveJs).listen(8888);
	jserver.showMem();
	console.log('server start at localhost:8888');
}

start();

