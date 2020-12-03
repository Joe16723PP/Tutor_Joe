// // simple web server
import express from 'express';
import path from 'path';
// get current path
const __dirname = path.resolve();
const myPublicWeb = __dirname + '/public';
const myPublicImage = __dirname + '/images';

const app = express();
const port = 3000;

// // not use prefix path
// app.use(express.static(myPublicWeb));
/* 
    use prefix path
    we can defind multiple path for resources likes image or file or server 
*/
app.use('/myweb', express.static(myPublicWeb));
app.use('/images', express.static(myPublicImage));

//  hook app with usable port for public request
app.listen(port, () => console.log(`my web server listening at http://localhost:${port}`))