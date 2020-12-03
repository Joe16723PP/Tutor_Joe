
    const topCountryList = ['china', 'usa', 'italy', 'thailand', 'uk', 'spain', 'France', 'Macao'];
    // format date to yyyy-mm-dd
    const myDate = new Date().toISOString().slice(0, 10);
    const myContent = document.querySelector('.content');
    for (const country of topCountryList) {
        fetchHistory(myDate, country).then(res => {
            // console.log(res);
            const data = res.response;
            const length = data.length;
            const usableData = data[length - 1];
            // create card
            createCard(usableData);
        });
    }

    // create top country card
    const createCard = (data) => {
        const cases = data['cases'];
        const country = data['country'];
        const time = data['time'];
        const totalDeath = data['deaths']['total'];
        const newDeath = data['deaths']['new'];
        // create card element
        const myCard = document.createElement('div');
        let myCase = document.createElement('div');
        myCard.setAttribute('class', 'card')
        myCase.setAttribute('class', 'cases');
        let eachCase = '';
        // create case list 
        for (const key in cases) {
            // console.log(key, cases[key]);
            let iconName = '';
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
                eachCase += `<div class="case-list"><div class="key"><span class="fas fa-${iconName}"></span>${key}</div><div class="value">${cases[key]}</div></div>`;
            }
        }
        myCase.innerHTML = eachCase;

        myCard.innerHTML = `<div class="header">
            <div class="header-text">${country}</div>
        </div>
        <div class="card-content">
            <div class="update-date">
                <div class="key"> <span class="fas fa-calendar-alt"></span>Lasted update</div>
                <div class="value">${time.slice(0, 10)}</div>
            </div>
            ${eachCase}
            <div class="death-container">
                <div class="key"><span class="fas fa-angry"></span>total deaths</div>
                <div class="value">${totalDeath}</div>
            </div>
        </div>
        `
        // after create all tag in card finish
        myContent.appendChild(myCard);
    }


    const input =  'Zercle technology';
    const tmp = input.split();
    console.log(tmp.reverse());
