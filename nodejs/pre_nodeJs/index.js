const http = require('http');
const fs = require('fs');
const dirFile = __dirname + '/src/index.html';
// console.log(__dirname);
//create a server object:
http.createServer((req, res) => {
    res.writeHead(200);
    const file = fs.createReadStream(dirFile);
    file.pipe(res);
}).listen(8080); //