import getWeatherData from "./utils/httpReq.js";
import { removeModal, showModal } from "./utils/modal.js";
import { getWeekDay } from "./utils/customeDate.js";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("Button");
const weatherContainer  = document.getElementById("weather");
const foreCastContainer  = document.getElementById("forecast");
const locationIcon  = document.getElementById("location");
const modalButton  = document.getElementById("modal-button");

const renderCurrentWeather = (data) => {
    if(!data) return;
    const weaterJsx = `
    <h1>${data.name},${data.sys.country}</h1>
    <div id="main">
        <img alt="weather icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
        <span>${data.weather[0].main}</span>
        <p>${Math.round(data.main.temp)} °C</p>
    </div>
    <div id="info">
        <p>Humidity: <span>${data.main.humidity}%</span></p>
        <p>Wind Speed: <span>${data.wind.speed}m/s</span></p>
    </div>
    `;
    weatherContainer.innerHTML = weaterJsx;    
};

const renderForecastWeather = (data) => {
    foreCastContainer.innerHTML = "";
    data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
    data.forEach(i => {
        const forecastJsx = `
            <div>
            <img alt="weather icon" src="https://openweathermap.org/img/w/${i.weather[0].icon}.png"/>
            <h3>${getWeekDay (i.dt) }</h3>
            <p>${Math.round(i.main.temp)} °C</p>
            <span>${i.weather[0].main}<span/>
            </div>
        `;
        foreCastContainer.innerHTML += forecastJsx;
    });
};

const searchHandeler = async () => {
    const cityName = searchInput.value;
    if(!cityName){
        showModal("please enter city name!");
        return;
    };
     const currentData = await getWeatherData("current",cityName);
     renderCurrentWeather(currentData);
     const forcastdata =  await getWeatherData("forecast",cityName);
     renderForecastWeather(forcastdata);
};

const positionCallback = async (position) => {
    const {latitude,longitude} = position.coords;
    const currentData = await getWeatherData("current",position.coords);
    renderCurrentWeather(currentData);
    const forcastdata = await getWeatherData ("forecast",position.coords);
    renderForecastWeather(forcastdata); 
};

const errorCallback = (error) => {
console.log(error.massage);
};

const locationHandeler = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positionCallback,errorCallback);
    }else{
        showModal("your browser does not support geolocation");
    }
}; 

const initHandeler = async () => {
    const currentData = await getWeatherData("current","tehran");
    renderCurrentWeather(currentData);
    const forcastdata =  await getWeatherData("forecast","tehran");
    renderForecastWeather(forcastdata); 
};


searchButton.addEventListener("click",searchHandeler);
locationIcon.addEventListener("click",locationHandeler);
modalButton.addEventListener("click",removeModal);
document.addEventListener("DOMContentLoaded",initHandeler) ;