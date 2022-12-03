const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
let projectData = {};
const PORT = 8000;

// Start up an instance of app
const app = express();

/* Middleware*/
// Cors for cross origin allowance
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));

// get wheather data handler
const getWeatherData = (request, response) => {
    response.send({status: 200, message: {...projectData}})
}

// set wheather data handler
const setWeatherData = (request, response) => {
    projectData = {
        ...request.body
    }
    response.send({ status: 201, message: "Data Added Sucessfully" });
}

// get weather data API endpoint
app.get("/weather", getWeatherData);
// set weather data API endpoint
app.post("/weather", setWeatherData);

// Setup Server
app.listen(PORT, () => {
    console.log("Application is running on PORT", PORT)
});