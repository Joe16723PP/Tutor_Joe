import moment from 'moment';

// get current date
export const getCurrentDate = () => {
    return moment().format('l');
}
// get current time
export const getCurrentTime = () => {
    return moment().format('lts');
}
// get day
export const getDay = () => {
    return moment().format('dddd');
}

export const myName = 'program';