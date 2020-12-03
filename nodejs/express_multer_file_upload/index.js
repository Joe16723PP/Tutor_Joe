import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const app = express();
const port = 3000;
const __dirname = path.resolve();
const webPath = __dirname + '/public';
const imgPath = __dirname + '/upload';

// allow origins
app.use(cors());

// setup filname and destination
const multerOptions = (path) => {
    return multer.diskStorage({
        destination: (req, file, next) => {
            // let err = new Error('not accept');
            const upLoadPath = path;
            next(null, upLoadPath);
        },
        filename: (req, file, next) => {
            const filename = file.originalname;
            next(null, filename);
        }
    })
};
// tell middleware to use our opion
const upload = multer({
    storage: multerOptions('upload/')
});

// serve static web
app.use('/website', express.static(webPath));
// serve upload folder for client
app.use('/upload', express.static(imgPath));

app.get('/', (req, res) => {
    res.json({ msg: "my upload api" });
})

app.post('/upload', upload.single('image'), (req, res) => {
    // write file name to db
    res.json({ msg: "upload complete" });
})


app.listen(3000, 'localhost', () => {
    console.log(`api server listen on http://localhost:${port}`);
})