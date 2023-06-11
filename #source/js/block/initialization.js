
const tabMenu = new TabMenu(btnsTabMenu, tabMenuPanel);
const weather = new Weather();

// loaded started page values
window.addEventListener('load', e=> {
    btnsTabMenu[0].classList.add('btn-active');
    tabMenuPanel[1].style.display = 'none';

    weather.get('Kyiv');
});

btnsTabMenu.forEach(item => {
    item.addEventListener('click', e => {
        tabMenu.ActiveContentTabMenu(item);
    });
});

a.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
    });
});

btnSearch.addEventListener('click', e => {
    Weather.city = search.value;
    weather.refreshWeather();
    weather.get(Weather.city);
});