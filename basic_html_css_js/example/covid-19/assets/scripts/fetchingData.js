// test await
// working with async only

const statisticUrl = "https://covid-193.p.rapidapi.com/statistics";
const countryUrl = 'https://covid-193.p.rapidapi.com/countries';
const historyUrl = 'https://covid-193.p.rapidapi.com/history?';
const settings = {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "93a33cc53fmsh717f16844d2b535p1165a3jsn9dee4f81821e"
    }
};

//statistic data
const fetchStatistic = async () => {
    // fetch(statisticUrl, settings)
    const res = await fetch(statisticUrl, settings);
    return res.json();
}


// country list 
const fetchCountryList = async () => {
    const res = await fetch(countryUrl, settings);
    return res.json();
}

// history of country 
const fetchHistory = async (date, country) => {
    // date format = yyyy-mm-dd
    const params = `day=${date}&country=${country}`;
    const url = historyUrl + params;
    const res = await fetch(url, settings)
    return res.json();
}
