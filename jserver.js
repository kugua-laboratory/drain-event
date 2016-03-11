

var fs = require('fs');
var path = require('path');

function Jserver() {
}


Jserver.prototype.serveJs = function(req, res) {
    res.on('drain', function(){
        console.log('drain event fired in serveJs...');
    })
    res.writeHead(200, {
        'Content-Type': 'application/x-javascript',
        'Cache-Control': 'no-cache'
    });
    fs.readFile('./angular.js', function(err, content) {
        if (err) {
            console.log(err, '报错了');
        } else {
            res.end(content);
        }
    })
}


Jserver.prototype.serveJsByStream = function(req, res) {

//  res.on('drain', function(){
//        console.log('drain event fired... in serveJsByStream');
//   })

    res.writeHead(200, {
	    'Content-Type': 'application/x-javascript',
	    'Cache-Control': 'no-cache'
	});

	var rs = fs.createReadStream('./angular.js', {
        highWaterMark: 80 * 1000 * 1000
    });
	rs.pipe(res);
}


Jserver.prototype.showMem = function() {
    setInterval(() => {
        var memUsage = process.memoryUsage();
        console.log('| %s | %s | %s |', 'rss: ' + (memUsage.rss / 1000 / 1000) , 'heap: ' + memUsage.heapTotal / 1000 / 1000, 'heapUsed: ' + memUsage.heapUsed / 1000 / 1000);
    }, 1000);
}

module.exports = Jserver;