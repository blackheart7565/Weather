
class DateTimeWork {
    days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];

    getDate(value = 0) {
        let date = value === 0 ? new Date() : new Date(value);

        const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;

        return `${date.getDate()}.${month}.${date.getFullYear()}`;
    }
    getTime(value = 0, isSecond = true) {
        let date = value === 0 ? new Date() : new Date(value);

        const hours =   this.#appendZeroStart(date.getHours());
        const minutes =  this.#appendZeroStart(date.getMinutes());
        const seconds =  this.#appendZeroStart(date.getSeconds());

        return isSecond === true ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
    }
    getDurationTime(sunriseTime, sunsetTime, isSecond = true) {
        const durationTime = sunsetTime - sunriseTime;

        const hours = Math.floor(durationTime / (1000 * 60 * 60));
        const minutes = Math.floor((durationTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((durationTime % (1000 * 60)) / 1000);

        return isSecond === true ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
    }
    getWeekDayName(date) {
        return this.getDate(date) === this.getDate() ? 'ToNight': this.days[new Date(date).getDay()]
    }
    #appendZeroStart(value) {
        return value > 9 ? `${value}` : `0${value}`;
    }
}