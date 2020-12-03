const functions = require('firebase-functions');
const app = require('express')();
const users = [
    {
        name: 'joe',
        email: 'email@email.com'
    },
    {
        name: 'kevin',
        email: 'kevin@email.com'
    }
]
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.json({ msg: "Hello from Firebase! by jirot joe" });
// });

app.get('/', (req, res) => {
    res.json({ msg: 'my first firebase function with express' });
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:name', (req, res) => {
    const name = req.params.name;
    const user = users.filter(value => {
        return value.name === name;
    })
    if (user.length > 0) {
        res.json(user[0]);
    } else {
        res.status('404').json({ msg: 'user not found' });
    }
})

app.listen(3000, () => {
    console.log('listenig.. on port 3000');
})

exports.app = functions.https.onRequest(app);