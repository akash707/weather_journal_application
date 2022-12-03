/* Global Variables */

// Create a new date instance dynamically with JS
const API_KEY = "f98c2719e1b8cfe5d7ef7fc834fbe0aa&units=imperial";
const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

/**
 * 
 * @param {String} url 
 * @returns Promise having GET API response object
 */
const getData = async (url) => {
    const response = await fetch(url, {
        method: "GET",
    });
    return response.json();
}

/**
 * Get weather Data using open weather map server
 * @param {*} zipCode 
 * @returns Promise having response json object from open weather service
 */
const getWeatherData = async (zipCode) => {
    const url = `${OPEN_WEATHER_BASE_URL}?zip=${zipCode}&appid=${API_KEY}`;
    return getData(url);
};

/**
 * Get weather Data from server
 * @returns Promise having response json object from server
 */
const getWeatherDataFromServer = async () => {
    const url = `/weather`;
    return getData(url);
}

/**
 * Posts the weather data to the server
 * @param {*} postData : Data to be posted in Server
 * @returns Promise with message
 */
const postWeatherData = async (postData) => {
    const url = `/weather`;
    const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
    });
    return response.json();
};

/**
 * After successful API response update the UI
 * @param {*} weatherData 
 */
const updateUI = async () => {
    const weatherData = await getWeatherDataFromServer();
    if (weatherData && weatherData.message && Object.keys(weatherData).length) {
        const { message } = weatherData;
        const dateElement = document.getElementById("date");
        const tempElement = document.getElementById("temp");
        const content = document.getElementById("content");
        tempElement.innerHTML = `<b>Temperature:</b> ${message.temprature}`;
        dateElement.innerHTML = `<b>Date:</b> ${message.date}`;
        content.innerHTML = `<b>User Input:</b> ${message.userInput}`;
    }
};

/**
 * Generating the wether report on click of Gerate Fuction.
 */
const generateWeatherReport = async () => {
    try {
        const zipCode = document.getElementById("zip").value;
        const userInput = document.getElementById("feelings").value;
        if (zipCode) {
            const weatherData = await getWeatherData(zipCode);
            const postData = {
                temprature: weatherData.main.temp,
                date: newDate,
                zipCode,
                userInput,
            };
            const postResponse = await postWeatherData(postData);
            if (postResponse && postResponse.status === 201) {
                updateUI();
            }
        }
    } catch (error) {
        console.log("Error in generating the weather report", error);
        alert("Error in generating weather report");
    }
};

window.onload = () => {
    document.getElementById("generate").addEventListener("click", () => {
        generateWeatherReport();
    });
};
