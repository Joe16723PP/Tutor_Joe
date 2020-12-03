import express from 'express';
import bodyParser from 'body-parser';
import mariadb from 'mariadb';
import { my_pass } from './myPass.js';

const port = 3000;
const app = express();
const insertKeys = ['name', 'email', 'img_url', 'description', 'upload_date'];
const emailRegEx = /^([a-zA-Z]){2}([a-zA-Z_.0-9])?([_.]?[a-zA-Z0-9])*@([a-zA-Z]{2,12})([.]{1}[a-zA-Z]{2,4})?([.]{1}[a-zA-Z]{2,4})$/g;

const connector = mariadb.createPool({
    host: 'localhost',
    database: 'my_gallery',
    port: '3306',
    user: 'root',
    password: my_pass,
    multipleStatements: true,

});
const emailValidator = (req, res, next) => {
    const isPass = emailRegEx.test(req.params.email);
    console.log(isPass);
    if (isPass) {
        next();
    } else {
        res.status('406').json({ message: "invalid email" });
    }
}

const bodyValidator = (req, res, next) => {
    const objLength = Object.keys(req.body).length;
    if (objLength < 5) {
        res.status('406').json({message: "missing input"});
    } else {
        for (const key in req.body) {
            if(!insertKeys.includes(key)) {
                res.status('406').json({message: "invalid input"});
            }
        }
    }
    next();
}


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: "mariaDB api is working!!" });
});

app.get('/gallery', (req, res) => {
    const queryString = `SELECT * FROM gallery`;
    connector.getConnection()
        .then(async (conn) => {
            try {
                let response = await conn.query(queryString);
                res.json(response);
            } catch (e) {
                res.status('404').json({ message: "connection fail" });
            }
        })
});

app.get('/gallery/:email', emailValidator, (req, res) => {
    const email = req.params.email;
    const queryString = `SELECT * FROM gallery WHERE email = "${email}";`;
    connector.getConnection()
        .then(async (conn) => {
            try {
                let response = await conn.query(queryString);
                res.json(response);
            } catch (e) {
                console.log(e);
                res.status('404').json({ message: "connection fail" });
            }
        })
});

app.post('/gallery', bodyValidator, (req, res) => {
    const queryString = `INSERT INTO gallery VALUE(
        "${req.body.name}","${req.body.email}","${req.body.img_url}","${req.body.description}","${req.body.upload_date}");`;
    connector.getConnection()
        .then(async (conn) => {
            try {
                let response = await conn.query(queryString);
                res.json(response);
            } catch (e) {
                res.status('404').json({ message: "fail to write new user" });
            }
        })
});

app.patch('/gallery/:email', emailValidator, (req, res) => {
    const email = req.params.email;
    const objLength = Object.keys(req.body).length;
    if (objLength <= 0) {
        res.status('406').json({ message: "missing required field" })
    }
    let optionalStr = '';
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            optionalStr += `${key} = "${req.body[key]}",`;
        }
    }
    optionalStr = optionalStr.substring(0, optionalStr.length - 1);
    const queryString = `UPDATE gallery SET ${optionalStr} WHERE email = "${email}";`;
    connector.getConnection()
        .then(async (conn) => {
            try {
                let response = await conn.query(queryString);
                conn.release();
                res.json(response);
            } catch (e) {
                console.log(e);
                conn.release();
                res.status('404').json({ message: `fail to update user: ${req.params.email}` });
            }
        })
})

app.delete('/gallery/:email', emailValidator, (req, res) => {
    const email = req.params.email;
    const queryString = `DELETE FROM gallery WHERE email = "${req.params.email}";`;
    connector.getConnection()
        .then(async (conn) => {
            try {
                let response = await conn.query(queryString);
                res.json(response);
            } catch (e) {
                res.status('404').json({ message: `fail to delete user: ${req.params.email}` });
            }
        })
})

app.listen(port, () => {
    console.log(`api server listen on http://localhost:${port}`);
})