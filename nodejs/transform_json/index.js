const fs = require('fs');
const fname = __dirname + '/transformed.json';

class Province {
    constructor(id, en, th) {
        this.id = id;
        this.en = en;
        this.th = th;
    }
}
const raw = require('./raw.json');
const array = [];

for (const ele in raw) {
    if (raw.hasOwnProperty(ele)) {
        // console.log(raw[ele]);
        const { en, th } = raw[ele]['name'];
        // console.log(en, th);
        const province = new Province(ele, en, th);
        array.push(province);
    }
}

console.log(__dirname);

// const res = fs.writeFileSync(fname, JSON.stringify(array), 'utf-8');
fs.writeFile(fname, JSON.stringify(array), 'utf8', () => {
    console.log('success');
    
})
