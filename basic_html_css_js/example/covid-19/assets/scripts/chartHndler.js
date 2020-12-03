let selector;
let dateEle;
let selectedCountry = '';
const currentDate = new Date().toISOString().slice(0, 10);
// delay for script and document loaded
setTimeout(() => {
    selector = document.querySelector('#country_selector');
    dateEle = document.querySelector('#selected_date');
    dateEle.addEventListener('change', (event) => {
        const date = event.target.value;
        getOnlyBarChart(date, selectedCountry);
    })
    // console.log(selector);
    getCountryList();
    // const ctx = document.querySelector('#bar_chart');
    // console.log(ctx);
}, 3000);


const getCountryList = () => {
    fetchCountryList().then(res => {
        const countries = res['response'];
        for (const country of countries) {
            const option = document.createElement('option');
            option.setAttribute('value', country);
            option.innerHTML = country;
            selector.appendChild(option);
        }
        selector.addEventListener('change', (event) => {
            selectedCountry = event.target.value;
            if (selectedCountry !== 'null') {
                getHistory(currentDate, selectedCountry);
            }
        });
    })
}

const getHistory = (date, country) => {
    dateEle.setAttribute('value', currentDate);
    fetchHistory(date, country).then(histories => {
        const historyList = histories['response'];
        const lasted = historyList[historyList.length - 1];
        const cases = lasted['cases'];
        const deathCase = lasted['deaths']['total'];
        const labels = [];
        const data = [];
        const historyLabel = [];
        const historyData = [];
        // for yesterday data
        for (const history of historyList) {
            const totalCase = history['cases']['total'];
            let updTime = history['time'];
            updTime = updTime.slice(11, 20);
            historyLabel.push(updTime);
            historyData.push(totalCase);
        }
        // for current data
        for (const key in cases) {
            if (key !== 'total') {
                let val = cases[key] === null ? 0 : cases[key];
                console.log(val);
                if (isNaN(val)) {
                    val = val.replace('+', '');
                }
                labels.push(key);
                data.push(+val);
            }
        }
        labels.push('deaths');
        data.push(deathCase);
        const header = document.querySelector('.history-header');
        header.innerHTML = `${lasted['country']}   [${lasted['day']}]`
        fillData(cases);
        createPieChart(data, labels);
        createBarChart(historyData, historyLabel);
    })
}

const createPieChart = (dataChart, labelsChart) => {
    console.log(dataChart);
    const colorList = ['#FF8A3F', '#FBD76F', '#D5FB6F', '#6FFBB3', '#6FDFFB'];
    const ctx = document.querySelector('#pie_chart');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: dataChart,
                backgroundColor: colorList
            }],
            labels: labelsChart
        },
    });
}

const createBarChart = (dataList, labelList) => {
    const ctx = document.querySelector('#bar_chart');
    console.log(ctx);
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelList,
            datasets: [{
                label: 'Covid cases history',
                data: dataList,
                // store color list
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
    });
}

const fillData = (cases) => {
    const root = document.querySelector('.history-detail');
    let allCase = '';
    let iconName = '';
    for (const key in cases) {
        switch (key) {
            case 'new':
                iconName = 'arrow-alt-circle-up';
                break;
            case 'active':
                iconName = 'user-md'
                break;
            case 'critical':
                iconName = 'shield-virus'
                break;
            case 'recovered':
                iconName = 'briefcase-medical';
                break;
            case 'total':
                iconName = 'users';
                break;
            default:
                break;
        }
        if (cases.hasOwnProperty(key)) {
            allCase += `<div class="case-list"><div class="key"><span class="fas fa-${iconName}"></span>${key}</div><div class="value">${cases[key]}</div></div>`;
        }
    }
    root.innerHTML = allCase;
}

const getOnlyBarChart = (date, country) => {
    fetchHistory(date, country).then(histories => {
        const historyList = histories['response'];
        const historyLabel = [];
        const historyData = [];
        // for yesterday data
        for (const history of historyList) {
            const totalCase = history['cases']['total'];
            let updTime = history['time'];
            updTime = updTime.slice(11, 19);
            historyLabel.push(updTime);
            historyData.push(totalCase);
        }
        
        createBarChart(historyData, historyLabel);
    })
}

