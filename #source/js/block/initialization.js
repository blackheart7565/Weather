

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

btnSearch.addEventListener('click', e => {
    if(search.value === '' || search.value === ' ' || search.value === null || search.value === undefined){
        weather.refreshWeather();
        weather.get('Kyiv');
        console.clear();
    }else{
        weather.refreshWeather();
        weather.get(search.value);
    }
});
search.addEventListener('input', e => {
    if(search.value === '' || search.value === ' ' || search.value === null || search.value === undefined){
        weather.refreshWeather();
        weather.get('Kyiv');
        console.clear();
    }
});

