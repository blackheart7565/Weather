
const btnsTabMenu = document.querySelectorAll('.tab-menu__btn')
        ,tabMenuPanel = document.querySelectorAll('.tab-menu__panel')
        ;

const error = document.getElementById('error');

const search = document.getElementById('search')
        , btnSearch = document.getElementById('btn-search')
        , city = document.querySelectorAll('#city')
        , daysItemLink = document.querySelectorAll('.tab-menu__weather-days--link')
        , hourlyList = document.querySelectorAll('.tab-menu__hourly--list')
        , weatherDaysList = document.querySelector('.tab-menu__weather-days--list');

const currentData = document.getElementById('current-data');

const icon = document.querySelector('.tab-menu__img');
const description = document.querySelector('.tab-menu__subtext');

const temperature = document.querySelector('.tab-menu__heading');
const realFeel = document.querySelector('.tab-menu__real-feel--name');//

const sunrise = document.querySelector('.tab-menu__sunrise--name');
const sunset = document.querySelector('.tab-menu__sunset--name');
const duration = document.querySelector('.tab-menu__duration--name');

const nearestCityList = document.querySelector('.tab-menu__nearest-cities--list');