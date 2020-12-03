interface Car {
    model: string;
    year: string;
    engine?: string;
}

const myCars: Car[] = [
    {
        model: 'test',
        year: '1999'
    },
    {
        model: 'test 2',
        year: '2010'
    }
];
const tmp = {
    model: 'test 2',
    year: '2010'
}
// myCars.push(tmp)

console.log(myCars.indexOf(tmp));
