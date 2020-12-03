import { getCurrentDate, getCurrentTime, getDay, myName } from './dateFunction.js';

import http from 'http';

//create a server object:
http.createServer((req, res) => {
    res.write('my website eiei');
    res.end();
}).listen(3000);
console.log('localhost listen on port 8080');
