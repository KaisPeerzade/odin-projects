import "./style.css";

import { getWeather } from "./api";
import { processWeatherData } from "./weather";

const form = document.querySelector("#search-form");
const locationInput = document.querySelector("#location-input");

const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error-message");

const weatherContainer = document.querySelector("#weather-container");

const locationElement = document.querySelector("#location");
const conditionElement = document.querySelector("#weather-condition");
const temperatureElement = document.querySelector("#temperature");
const feelsLikeElement = document.querySelector("#feels-like");

const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");
const highLowElement = document.querySelector("#high-low");

const celsiusButton = document.querySelector("#celsius-btn");
const fahrenheitButton = document.querySelector("#fahrenheit-btn");

let currentWeather = null;
let currentUnit = "C";

weatherContainer.style.display = "none";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const location = locationInput.value.trim();

    if (location === "") {
        return;
    }

    loading.textContent = "Loading...";
    errorMessage.textContent = "";

    try {
        const data = await getWeather(location);

        currentWeather = processWeatherData(data);

        displayWeather();

        locationInput.value = "";
    } catch (error) {
        errorMessage.textContent =
            "Could not find that location. Please try again.";

        weatherContainer.style.display = "none";
    } finally {
        loading.textContent = "";
    }
});

function displayWeather() {
    weatherContainer.style.display = "block";

    locationElement.textContent = currentWeather.location;

    conditionElement.textContent = currentWeather.conditions;

    humidityElement.textContent =
        `Humidity: ${currentWeather.humidity}%`;

    windElement.textContent =
        `Wind: ${currentWeather.windSpeed} km/h`;

    updateTemperatureDisplay();

    changeWeatherBackground(currentWeather.conditions);
}

function updateTemperatureDisplay() {
    let temperature;
    let feelsLike;
    let high;
    let low;

    if (currentUnit === "C") {
        temperature = toCelsius(currentWeather.temperature);
        feelsLike = toCelsius(currentWeather.feelsLike);
        high = toCelsius(currentWeather.high);
        low = toCelsius(currentWeather.low);

        temperatureElement.textContent =
            `${Math.round(temperature)}°C`;

        feelsLikeElement.textContent =
            `Feels like ${Math.round(feelsLike)}°C`;

        highLowElement.textContent =
            `High: ${Math.round(high)}°C | Low: ${Math.round(low)}°C`;
    } else {
        temperature = currentWeather.temperature;
        feelsLike = currentWeather.feelsLike;
        high = currentWeather.high;
        low = currentWeather.low;

        temperatureElement.textContent =
            `${Math.round(temperature)}°F`;

        feelsLikeElement.textContent =
            `Feels like ${Math.round(feelsLike)}°F`;

        highLowElement.textContent =
            `High: ${Math.round(high)}°F | Low: ${Math.round(low)}°F`;
    }
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

celsiusButton.addEventListener("click", () => {
    currentUnit = "C";

    if (currentWeather) {
        updateTemperatureDisplay();
    }
});

fahrenheitButton.addEventListener("click", () => {
    currentUnit = "F";

    if (currentWeather) {
        updateTemperatureDisplay();
    }
});

function changeWeatherBackground(conditions) {
    const condition = conditions.toLowerCase();

    if (condition.includes("rain")) {
        document.body.style.background = "#708090";
    } else if (condition.includes("snow")) {
        document.body.style.background = "#dfefff";
    } else if (condition.includes("cloud")) {
        document.body.style.background = "#b0c4de";
    } else if (condition.includes("clear") || condition.includes("sun")) {
        document.body.style.background = "#87ceeb";
    } else {
        document.body.style.background = "#c0c0c0";
    }
}