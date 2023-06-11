
class Weather {
    #apiQuery;
    #timeWork;
    static city;

    constructor() {
        this.#apiQuery = new APIQuery();
        this.#timeWork = new TimeWork();
    }

    get(city) {
        const apiKey = `c04f46f774de2f467fa5443d7c7f9950`;
        const lang = `ru`;
        const units = 'metric';
        const cnt = 8;

        const currentDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${apiKey}`;

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=${units}&cnt=${cnt}&appid=${apiKey}`;

        this.#apiQuery.getQueryData(currentDataUrl)
            .then(data => {
                this.getCurrentForecast(data);
            })
            .catch(error => {
                console.error(error);
                alert(error);
            });

        this.#apiQuery.getQueryData(url)
            .then(data => {
                this.getHourlyForecast(data);
            })
            .catch(error => {
                console.error(error);
                alert(error);
            })
    }
    getCurrentForecast(data) {
        const currentData = document.getElementById('current-data');
        const city = document.getElementById('city');

        const icon = document.querySelector('.tab-menu__img');
        const description = document.querySelector('.tab-menu__subtext');

        const temperature = document.querySelector('.tab-menu__heading');
        const realFeel = document.querySelector('.tab-menu__real-feel');

        const sunrise = document.querySelector('.tab-menu__sunrise');
        const sunset = document.querySelector('.tab-menu__sunset');
        const duration = document.querySelector('.tab-menu__duration');

        const sunriseTime = this.#timeWork.getTime(data.sys.sunrise * 1000, false);
        const sunsetTime = this.#timeWork.getTime(data.sys.sunset * 1000, false);

        const durationTime = this.#timeWork.getDurationTime(data.sys.sunrise * 1000, data.sys.sunset * 1000, false);


        return (function (timeWork) {
            currentData.textContent = timeWork.getDate(data["dt"] * 1000);
            city.innerHTML = `<span class="tab-menu__hourly--city-name title">City: </span>${data.name}`;

            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            description.textContent = data.weather[0].description;

            temperature.textContent = `${Math.round(data.main.temp)}\u00B0C`;
            realFeel.innerHTML = `<span>Real Feel: </span>${Math.round(data.main.feels_like)}\u00B0C`;

            sunrise.innerHTML = `<span class="tab-menu__text">Sunrise: </span>${sunriseTime}`;
            sunset.innerHTML = `<span class="tab-menu__text">Sunset: </span>${sunsetTime}`;
            duration. innerHTML = `<span class="tab-menu__text">Duration: </span>${durationTime}`;
        })(this.#timeWork);
    }
    getHourlyForecast(data) {
        const ul = document.querySelector('.tab-menu__hourly--list');

        for (let x = 0; x < data.list.length; x++) {
            const item = data.list[x];
            if(x <= 5){
                const dataTime = new Date(item.dt_txt);

                ul.innerHTML += `<li class="tab-menu__hourly--item">
                                    <p class="tab-menu__hourly--time">${this.#timeWork.getTime(dataTime, false)}</p>
                                    <img class="tab-menu__hourly--icon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="img-icon-forecast"/>
                                    <p class="tab-menu__hourly--forecast">${item.weather[0].description}</p>
                                    <p class="tab-menu__hourly--temp">${Math.round(item.main.temp)}&deg;</p>
                                    <p class="tab-menu__hourly--real-feel">${Math.round(item.main.feels_like)}&deg;</p>
                                    <p class="tab-menu__hourly--wind">${Math.round(item.wind.speed)} ${this.getWindFormat(item.wind.deg)}</p>
                                </li>`;
            }
        }
    }
    getWindFormat(deg) {
        switch (true) {
            case (deg >= 0 && deg < 45):
                return 'N';
            case (deg >= 45 && deg < 90):
                return 'NE';
            case (deg >= 90 && deg < 135):
                return 'E';
            case (deg >= 135 && deg < 180):
                return 'SE';
            case (deg >= 180 && deg < 225):
                return 'S';
            case (deg >= 225 && deg < 270):
                return 'SW';
            case (deg >= 270 && deg < 315):
                return 'W';
            case (deg >= 315 && deg < 360):
                return 'NW';
            default:
                return 'N';
        }
    }
}













