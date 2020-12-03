// file server : manage with file
import fs from 'fs';
// path : get current dir
import path from 'path';

// get database path file
const __dirname = path.resolve();
const dbPath = __dirname + '/database/db.json';

const randUser = () => {
    const rand = Math.floor(Math.random() * Math.floor(10));
    const user = {
        name: `user_${rand}`,
        email: `email${rand}@email.com`
    }
    return user;
}

// read file
let res = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
// get all user
let userList = res['users'];
console.log(userList);
// email we want to delete 
const deletedEmail = 'email4@email.com';

res['users'] = userList.filter((value, index) => {
    return value.email !== deletedEmail;
})
// results are userlist without deletedEmail
console.log(res);


// delete user by email 



// const tmp = randUser();

// const result = res['users'].find(({ email }) => email === tmp.email);
// if (result) {
//     console.log('dupicate');
//     res['users'].filter((user, index) => {
//         if (user.email === result.email) {
//             res['users'][index] = result;
//             return user;
//         }
//     })
// } else {
//     console.log('new');
//     res['users'].push(tmp);
// }



// fs.writeFileSync(dbPath, JSON.stringify(res));

