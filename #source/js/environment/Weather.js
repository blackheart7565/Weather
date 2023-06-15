class Weather {
    #apiQuery;
    #dateTimeWork;
    #weakDay
    #countCardList = 6;

    #apiKey = `c04f46f774de2f467fa5443d7c7f9950`;
    #lang = `en`;
    #units = 'metric';
    #cnt = 8;

    constructor() {
        this.#apiQuery = new APIQuery();
        this.#dateTimeWork = new DateTimeWork();
    }

    // Получение данных с API запроса
    get(city = 'Kyiv') {
        const currentDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.#units}&lang=${this.#lang}&appid=${this.#apiKey}`;

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${this.#lang}&units=${this.#units}&cnt=${this.#cnt}&appid=${this.#apiKey}`;

        const urlSevenDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${this.#lang}&units=${this.#units}&cnt=40&appid=${this.#apiKey}`;

        this.#apiQuery.getQueryData(currentDataUrl)
            .then(data => {
                this.#apiQuery.getError(error, false);
                this.getCurrentForecast(data);

                this.getNearestCities(data.coord, 20);
            })
            .catch(errorApi => {
                this.#apiQuery.getError(error, true, errorApi);
                console.error(errorApi);
            });

        this.#apiQuery.getQueryData(url)
            .then(data => {
                this.#apiQuery.getError(error, false);
                this.getHourlyForecast(data);
            })
            .catch(errorApi => {
                this.#apiQuery.getError(error, true, errorApi);
                console.error(errorApi);
            })

        this.#apiQuery.getQueryData(urlSevenDay)
            .then(data => {
                this.#apiQuery.getError(error, false);
                this.getForecastOnSixDay(data);
            })
            .catch(errorApi => {
                this.#apiQuery.getError(error, true, errorApi);
                console.error(errorApi);
            })
    }

    // Отображение текущей погоды города(страны)
    getCurrentForecast(data) {
        const sunriseTime = this.#dateTimeWork.getTime(data.sys.sunrise * 1000, false);
        const sunsetTime = this.#dateTimeWork.getTime(data.sys.sunset * 1000, false);
        const durationTime = this.#dateTimeWork.getDurationTime(data.sys.sunrise * 1000, data.sys.sunset * 1000, false);


        currentData.textContent = this.#dateTimeWork.getDate(data["dt"] * 1000);

        city.forEach(item => {
            item.innerHTML = `${data.name}`;
        });

        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        description.textContent = data.weather[0].description;

        temperature.textContent = `${Math.round(data.main.temp)}\u00B0C`;
        realFeel.innerHTML = `${Math.round(data.main.feels_like)}\u00B0C`;

        sunrise.innerHTML = `${sunriseTime}`;
        sunset.innerHTML = `${sunsetTime}`;
        duration.innerHTML = `${durationTime}`;
    }

    // Отображение временого промежутка текущего города(страны)
    getHourlyForecast(data) {
        const uls = document.querySelectorAll('.tab-menu__hourly--list');

        for (let x = 0; x < data.list.length; x++) {
            const item = data.list[x];
            if (x < this.#countCardList) {
                let li = this.createHourlyElementLi(item);

                uls.forEach((ul) => {
                    ul.append(li.cloneNode(true));
                });
            }
        }
    }

    // Отобрадение текущей погода города(страны) на 6 дней вперёд
    getForecastOnSixDay(data) {
        const weekDayList = document.querySelector('.tab-menu__weather-days--list');
        this.#weakDay = this.filterDay(data);

        for (let x in this.#weakDay) {
            const li = this.createWeekDaysElement(x, this.#weakDay);

            weekDayList.append(li);
        }
        document.querySelectorAll('.tab-menu__weather-days--link').forEach(item => {
            item.addEventListener('click', e => {
                this.#handleClick(data, e);
            });
        });
    }

    // Отображение ближайщих городов к текущему городу(страны)
    getNearestCities({lat, lon}, numberDisplayCity) {
        const urlFindNearestCity = `https://api.openweathermap.org/data/2.5/find?type=like&lat=${lat}&lon=${lon}&cnt=${numberDisplayCity}&lang=${this.#lang}&units=${this.#units}&appid=${this.#apiKey}`;

        this.#apiQuery.getQueryData(urlFindNearestCity)
            .then(data => {
                data.list = this.#getUniqueCity(data);
                this.#displayNearestCity(data);
            })
            .catch(errorApi => {
                this.#apiQuery.getError(error, true, errorApi);
                console.error(errorApi)
            });
    }

    // Отображение ближайщих городов
    #displayNearestCity(data) {
        nearestCityList.innerHTML = '';

        data.list.slice(0, 9).forEach(item => {
            const li = this.createNearestCityListItem(item);
            nearestCityList.append(li);
        });
        document.querySelectorAll('.tab-menu__nearest-cities--link').forEach(item => {
           item.addEventListener('click', event => {
                this.#handleClickNearestCity(event);
           })
        });
    }

    // Отображение погодных услови ближайщего города(страны)
    #handleClickNearestCity(event) {
        event.preventDefault();

        const target = event.target.closest('.tab-menu__nearest-cities--link');

        const nearestCity = target.querySelector('.tab-menu__nearest-cities--city');

        this.refreshWeather();

        console.log(nearestCity.textContent)
        this.get(nearestCity.textContent);
    }

    // Создание элемента списка ближайших городов
    createNearestCityListItem(item){
        const li = document.createElement('li');
        li.classList.add('tab-menu__nearest-cities--item');

        li.innerHTML = `<a href="#" class="tab-menu__nearest-cities--link">
                                    <div class="tab-menu__nearest-cities--location">
                                        <span class="tab-menu__nearest-cities--city">${item.name}</span>
                                        <span class="tab-menu__nearest-cities--country">${item.sys.country}</span>
                                    </div>
                                    <div class="tab-menu__nearest-cities--col">
                                        <div class="tab-menu__nearest-cities--row">
                                            <div class="tab-menu__nearest-cities--main-temp">
                                                <span class="tab-menu__nearest-cities--main-temp-title">Temp(&deg;C):</span>
                                                <div class="tab-menu__nearest-cities--main-temp-name">${Math.round(item.main.temp)}&deg;C</div>
                                            </div>                            
                                            <div class="tab-menu__nearest-cities--real-feel">
                                                <span class="tab-menu__nearest-cities--real-feel-title">RealFeel:</span>
                                                <div class="tab-menu__nearest-cities--real-feel-name">${Math.round(item.main.feels_like)}&deg;C</div>
                                            </div>
                                        </div>
                                        <img class="tab-menu__nearest-cities--img" src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="">
                                    </div>
                                </a>
                                `;
        return li;
    }

    // Получение уникальных городов(страны)
    #getUniqueCity(data) {
        const cities = data.list.map(city => city.name);

        // Фильтруем уникальные города
        const uniqueCities = [...new Set(cities)];

        // Создаем новый массив объектов городов с уникальными именами
        // Обновляем исходный объект с уникальными городами
        return uniqueCities.map(city => ({
            ...data.list.find(item => item.name === city)
        }));
    }

    // Отобрадение временого промежутка с секции дневного расклада на 6 дней
    #handleClick(data, event) {
        event.preventDefault();
        const target = event.target.closest('.tab-menu__weather-days--link');

        if (target) {
            const nameWeekDay = target.firstElementChild.textContent;

            for (const x in this.#weakDay) {
                const nameDay = this.#dateTimeWork.getWeekDayName(x);
                if (nameDay === 'ToNight') {
                    this.#updateHourlyList(data.list.slice(0, this.#countCardList), 0);
                }
                if (nameWeekDay === nameDay) {
                    const filteredItems = this.#weakDay[x].slice(0, this.#countCardList);
                    this.#updateHourlyList(filteredItems, 1);
                }
            }
        }
    };

    // Обновление списка временого промежутка
    #updateHourlyList = (items, listIndex) => {
        const hourlyList = document.querySelectorAll('.tab-menu__hourly--list');
        hourlyList[listIndex].innerHTML = '';

        for (const item of items) {
            const li = this.createHourlyElementLi(item);
            hourlyList[listIndex].append(li);
        }
    }

    // Создание "li" элемента для секции временого промежутка (hourly)
    createHourlyElementLi(item) {
        const li = document.createElement('li');
        const dataTime = new Date(item.dt_txt);
        li.classList.add('tab-menu__hourly--item');

        li.innerHTML = `<p class="tab-menu__hourly--time">${this.#dateTimeWork.getTime(dataTime, false)}</p>
                        <img class="tab-menu__hourly--icon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="img-icon-forecast"/>
                        <p class="tab-menu__hourly--forecast">${item.weather[0].description.replace(' ', '<br>')}</p>
                        <p class="tab-menu__hourly--temp">${Math.round(item.main.temp)}&deg;</p>
                        <p class="tab-menu__hourly--real-feel">${Math.round(item.main.feels_like)}&deg;</p>
                        <p class="tab-menu__hourly--wind">${Math.round(item.wind.speed)} ${this.getWindFormat(item.wind.deg)}</p>
                        `;
        return li;
    }

    // Создание "li" элемента для секции отобрадение расклада погоды на 6 дней
    createWeekDaysElement(item, weakDay) {
        const li = document.createElement('li');
        li.classList.add('tab-menu__weather-days--item');

        const nameDay = this.#dateTimeWork.getWeekDayName(item)
        const yearName = new Date(item).toLocaleString('default', {month: 'long'});
        const day = new Date(item).getDate();
        const icon = `https://openweathermap.org/img/wn/${weakDay[item][0].weather[0].icon}.png`
        const temp = Math.round(weakDay[item][0].main.temp);
        const description = (weakDay[item][0].weather[0].description).replace(' ', '<br>');

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
        return li;
    }

    // Получение еденицы измерения направления ветра
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

    // Обновление полей
    refreshWeather() {
        hourlyList.forEach(item => {
            item.innerHTML = '';
        });

        weatherDaysList.innerHTML = '';
    }

    // Фильтрация по дням
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