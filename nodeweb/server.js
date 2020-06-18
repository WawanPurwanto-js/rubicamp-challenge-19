// var http = require('http');
// http.createServer(function (req, res) {

//     res.writeHead(200, {
//         'content-Type': 'text/html'
//     });
//     res.write('Hello<b>  World</b><br>');
//     res.write('Nama<b> Saya</b>');

//     res.end();
// }).listen(3000);
// console.log("server running on http://localhost:3000");

var http = require('http');
var fs = require('fs');

var index = fs.readFileSync('index.html');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'content-Type': 'text/html'
    });

    res.end(index);
}).listen(3000);
console.log("server running on http://localhost:3000");