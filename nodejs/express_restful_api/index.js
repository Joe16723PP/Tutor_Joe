import express from 'express';
import moment from 'moment';
// import moment from 'moment-timezone';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import unidecode from 'unidecode';

const app = express();
const port = 3000;
const __dirname = path.resolve();
const dbPath = __dirname + '/database/db.json';
const nameRegEx = /^([a-zA-Zก-ฮเ-ไ]{2,})+([\s]{1}[a-zA-Zก-๏]+[.]?)?([\s]{1}?[a-zA-Zก-ฮเ-ไ]{2,})+$/;
const emailRegEx = /^([a-zA-Z]){2}([a-zA-Z_.0-9])?([_.]?[a-zA-Z0-9])*@([a-zA-Z]{2,12})([.]{1}[a-zA-Z]{2,4})?([.]{1}[a-zA-Z]{2,4})$/;



// multer option
const optionStorage = multer.diskStorage({
    destination: (req, res, next) => {
        next(null, 'uploads/');
    },
    filename: (req, res, next) => {
        // console.log(res);
        console.log(unidecode(res.originalname));
        // find type of file
        const fileType = path.extname(res.originalname);
        // create file name
        const fileName = res.originalname;
        // next function
        next(null, fileName);
    }
})
// multer middleware
const upload = multer({ storage: optionStorage });


// simple middleware for loging before main function executed
const loging = (req, res, next) => {
    console.log('has request !');
    // res.send('not allow');
    next();
}

// check duplicate user
const checkDupicateUser = (email, users) => {
    let foundIndex = null;
    const user = users.filter((value, index) => {
        if (value.email === email) {
            foundIndex = index;
            return value;
        }
    });

    if (user.length !== 0) {
        return {
            data: user[0],
            index: foundIndex
        };
    } else {
        return false;
    }
}

// set middleware for every api route
// app.use(loging);

// accept json body
app.use(bodyParser.json());
// allow cors origin
app.use(cors());
// accept url encode body
app.use(bodyParser.urlencoded({ extended: true }))

// express pattern
// server.method (path, middleware[?], function)

app.get('/test', (req, res, next) => {
    console.log(req.body);
    const obj = {
        msg: "Page Doesn't Exist",
    }
    let err = new Error(JSON.stringify(obj));
    // res.json(obj);
    err.statusCode = 404;
    next(err);
});

// error examole
app.get('/err', (req, res) => {
    const errMsg = {
        message: "duplicate user!"
    }
    // fs.readFileSync('./ad', 'utf8');
    // res.send();
    res.status('204').end();
    // res.send('read file');
    // res.send
    // res.json

})

app.get('/testQueryParam', (req, res) => {
    console.log(req.query);
    res.send('no action');
})


// get all users
app.get('/users', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const users = fileData['users'];
    res.json(users);
})

//get user by email
app.get('/users/:email', (req, res) => {
    const fileData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const email = req.params.email;
    const users = fileData['users'];
    if (email) {
        const user = checkDupicateUser(email, users);
        if (user) {
            res.json(user.data);
        } else {
            res.status('404').json({ message: "user not found" });
        }
    } else {
        res.status('406').json({ message: "please send email by using path param" });
    }
})

// create new user
app.post('/users', (req, res) => {
    let body = req.body;
    const bodyLength = Object.keys(body).length;
    if (bodyLength < 4) {
        res.status('400').json({ message: "require body is missing" });
        return;
    }

    if (emailRegEx.test(body.email) || nameRegEx.test(body.username)) {
        res.status('400').json({ message: "value is invalid" });
        return;
    }
    // body['upd_time'] = String(moment().format());
    // let fileData;
    let fileData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const email = req.body.email;
    const users = fileData['users'];
    const user = checkDupicateUser(email, users);
    if (user) {
        res.status('409').json({ message: "user is duplicated" });
    } else {
        users.push(body);
        fileData['users'] = users;
        fs.writeFileSync(dbPath, JSON.stringify(fileData));
        res.json({ message: "write new user complete" })
    }
});

// update all user property or replace new data by email
app.put('/users/:email', (req, res) => {
    console.log(req.body);
    let body = req.body;
    const bodyLength = Object.keys(body).length;
    if (bodyLength < 4) {
        res.status('400').json({ message: "require body is missing" });
        return;
    }
    if (emailRegEx.test(req.params.email) || nameRegEx.test(body.username)) {
        res.status('400').json({ message: "value is invalid" });
        return;
    }
    // body['upd_time'] = String(moment().format());
    let fileData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const email = req.params.email;
    let users = fileData['users'];
    const user = checkDupicateUser(email, users);
    if (user) {
        // write replace user logic
        users[user.index] = body;
        fileData['users'] = users;
        fs.writeFileSync(dbPath, JSON.stringify(fileData));
        res.json({ message: "update data complete" })
    } else {
        res.status('404').json({ message: "user not found" });
    }
})

// update user property
app.patch('/users/:email', (req, res) => {
    let body = req.body;
    const bodyLength = Object.keys(body).length;
    if (bodyLength < 1) {
        res.status('400').json({ message: "require body is missing" });
        return;
    }
    if (emailRegEx.test(req.params.email)) {
        res.status('400').json({ message: "value is invalid" });
        return;
    }
    body['upd_time'] = String(moment().format());
    const email = req.params.email;
    let fileData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    let users = fileData['users'];
    const user = checkDupicateUser(email, users);
    if (user) {
        // write update some field logic
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                users[user.index][key] = body[key];
            }
        }
        // update user data
        fileData['users'] = users;
        fs.writeFileSync(dbPath, JSON.stringify(fileData));
        res.json({ message: "update ... complete" })
    } else {
        res.status('404').json({ message: "user not found" });
    }
})

// delete user by email
app.delete('/users/:email', (req, res) => {
    const email = req.params.email;
    let fileData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const users = fileData['users'];
    const user = checkDupicateUser(email, users);
    if (user) {
        const tmp = users.filter(value => {
            return value.email !== email;
        });
        fileData['users'] = tmp;
        fs.writeFileSync(dbPath, JSON.stringify(fileData));
        res.json({ message: "delete user complete" })
    } else {
        res.status('404').json({ message: "user not found" });
    }
})

// upload image
app.post('/upload', upload.single('image'), (req, res) => {
    res.send('upload success!');
});

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`);
})
