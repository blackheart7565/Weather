class Weather {
    #apiQuery;
    #dateTimeWork;
    static city;

    constructor() {
        this.#apiQuery = new APIQuery();
        this.#dateTimeWork = new DateTimeWork();
    }

    get(city) {
        const apiKey = `c04f46f774de2f467fa5443d7c7f9950`;
        const lang = `en`;
        const units = 'metric';
        const cnt = 8;
        const cntDay = 40;

        const currentDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${apiKey}`;

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=${units}&cnt=${cnt}&appid=${apiKey}`;

        const urlSevenDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=${units}&cnt=${cntDay}&appid=${apiKey}`;


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

        this.#apiQuery.getQueryData(urlSevenDay)
            .then(data => {
                this.getForecastOnSevenDay(data);
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

        const sunriseTime = this.#dateTimeWork.getTime(data.sys.sunrise * 1000, false);
        const sunsetTime = this.#dateTimeWork.getTime(data.sys.sunset * 1000, false);

        const durationTime = this.#dateTimeWork.getDurationTime(data.sys.sunrise * 1000, data.sys.sunset * 1000, false);


        return (function (timeWork) {
            currentData.textContent = timeWork.getDate(data["dt"] * 1000);
            city.innerHTML = `<span class="tab-menu__hourly--city-name title">City: </span>${data.name}`;

            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            description.textContent = data.weather[0].description;

            temperature.textContent = `${Math.round(data.main.temp)}\u00B0C`;
            realFeel.innerHTML = `<span>Real Feel: </span>${Math.round(data.main.feels_like)}\u00B0C`;

            sunrise.innerHTML = `<span class="tab-menu__text">Sunrise: </span>${sunriseTime}`;
            sunset.innerHTML = `<span class="tab-menu__text">Sunset: </span>${sunsetTime}`;
            duration.innerHTML = `<span class="tab-menu__text">Duration: </span>${durationTime}`;
        })(this.#dateTimeWork);
    }

    getHourlyForecast(data) {
        const ul = document.querySelectorAll('.tab-menu__hourly--list');

        for (let x = 0; x < data.list.length; x++) {
            const item = data.list[x];
            if (x <= 5) {
                const dataTime = new Date(item.dt_txt);
                const li = document.createElement('li');
                li.classList.add('tab-menu__hourly--item');

                li.innerHTML = `<p class="tab-menu__hourly--time">${this.#dateTimeWork.getTime(dataTime, false)}</p>
                                <img class="tab-menu__hourly--icon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="img-icon-forecast"/>
                                <p class="tab-menu__hourly--forecast">${item.weather[0].description}</p>
                                <p class="tab-menu__hourly--temp">${Math.round(item.main.temp)}&deg;</p>
                                <p class="tab-menu__hourly--real-feel">${Math.round(item.main.feels_like)}&deg;</p>
                                <p class="tab-menu__hourly--wind">${Math.round(item.wind.speed)} ${this.getWindFormat(item.wind.deg)}</p>
                                `;

                ul.forEach((ul) => {
                    ul.append(li.cloneNode(true));
                });
            }
        }
    }

    getForecastOnSevenDay(data) {
        const weekDayList = document.querySelector('.tab-menu__weather-days--list');
        const weakDay = this.filterDay(data);

        for (let x in weakDay) {
            const li = document.createElement('li');
            li.classList.add('tab-menu__weather-days--item');

            const nameDay = this.#dateTimeWork.getWeekDayName(x)
            const yearName = new Date(x).toLocaleString('default', { month: 'long' });
            const day = new Date(x).getDate();
            const icon = `https://openweathermap.org/img/wn/${weakDay[x][0].weather[0].icon}.png`
            const temp = Math.round(weakDay[x][0].main.temp);
            const description = (weakDay[x][0].weather[0].description).replace(' ', '<br>');

            li.innerHTML = `<a href="#" class="tab-menu__weather-days--link">
                                <h2 class="tab-menu__weather-days--title title">${nameDay}</h2>
                                <p class="tab-menu__weather-days--data">
                                    <span class="tab-menu__weather-days--year">${yearName}</span>
                                    <span class="tab-menu__weather-days--day">${day}</span>
                                </p>
                                <img class="tab-menu__weather-days--img" src="${icon}" alt="icon-forecast">
                                <p class="tab-menu__weather-days--temp">${temp}&deg;C</p>
                                <p class="tab-menu__weather-days--forecast">${description}</p>
                            </a>
                            `;
            weekDayList.append(li);
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

    refreshWeather() {
        const hourlyList = document.querySelectorAll('.tab-menu__hourly--list');
        const weatherDaysList = document.querySelector('.tab-menu__weather-days--list');

        hourlyList.forEach(item => {
            item.innerHTML = '';
        });
        weatherDaysList.innerHTML = '';
    }

    filterDay(data) {
        const dailyForecasts = {};

        data.list.forEach((forecast) => {
            const date = forecast.dt_txt.split(' ')[0];

            if (dailyForecasts[date]) {
                dailyForecasts[date].push(forecast);
            } else {
                dailyForecasts[date] = [forecast];
            }
        });

        return dailyForecasts;
    }
}













