import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const dbPath = __dirname + '/database/db.json';
const uploadPath = __dirname + '/upload/';


export const readFile = () => {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    return data['images'];
}

export const writeFile = (filename) => {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    data['images'].push(filename);
    fs.writeFileSync(dbPath, JSON.stringify(data));
}


export const removeFile = (filename) => {
    const path = uploadPath + filename;
    try {
        fs.unlinkSync(path);
        return true;
    } catch (err) {
        return false;
    }

}