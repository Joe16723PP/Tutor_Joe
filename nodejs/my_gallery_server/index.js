import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import moment from 'moment';
import { readFile, writeFile, removeFile } from './fileManagementModule.js';

const app = express();
const port = 3000;
const __dirname = path.resolve();
const webPath = __dirname + '/public';
const imgPath = __dirname + '/upload';
// allow origins
// app.use(cors());

// setup filname and destination
const multerOptions = multer.diskStorage({
    destination: (req, file, next) => {
        const upLoadPath = 'upload/';
        next(null, upLoadPath);
    },
    filename: (req, file, next) => {
        const date = moment().format('YYYY-MM-DDThh-mm-ss');
        const filename = date + file.originalname;
        next(null, filename);
    }
});
// tell middleware to use our opion
const upload = multer({
    storage: multerOptions
});

// serve static web
app.use('/', express.static(webPath));
// serve upload folder for client
app.use('/upload', express.static(imgPath));

app.get('/api', (req, res) => {
    res.json({ msg: "my upload api" });
})

app.get('/api/images', (req, res) => {
    const files = readFile();
    res.json(files);
})

app.post('/api/images', upload.single('image'), (req, res) => {
    const filename = req.file.filename;
    writeFile(filename);
    res.json({ msg: "upload complete" });
})

app.delete('/api/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const result = removeFile(filename);

    if (result) {
        res.json({ msg: "delete success" });
    } else {
        res.status('404').json({ msg: "image not found" });
    }
})


app.listen(3000, 'localhost', () => {
    console.log(`api server listen on http://localhost:${port}`);
})