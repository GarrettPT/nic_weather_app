//Here we are going to include our dependencies, express, bodyparser, request. 

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

//Dotenv package

require("dotenv").config();

//Weather API Key constant

const apiKey = `${process.env.API_KEY}`;

//Set up configurations for express and body parser. 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Default launch display
app.get("/", function(req,res){

    res.render("index", {weather: null, error: null});
});

app.get("/zip", function(req,res){
    res.render("zip", {weather: null, error: null});
});

function renderWeather (url, origin, res){


    request(url, function(err, response, body){

        if (err) {
            res.render(`${origin}`, {weather: null, error: 'There was a problem. Please try again.'});
        } else{
            
        let weather = JSON.parse(body);

        if (weather.main == undefined) {
            res.render(`${origin}`, {weather: null, error: 'Error, weather could not be found. Please double check your request spelling.'});
        } else {

                let place = `${weather.name}, ${weather.sys.country}`,
                weatherTimezone = `${new Date(
                    weather.dt * 1000 - weather.timezone * 1000
                )}`;

                let weatherTemp = `${weather.main.temp}`,
                weatherPressure = `${weather.main.pressure}`,
                weatherTimeZone = `${weather.main.pressure}`,
                // Select Weather Icon here
                weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                weatherDescription = `${weather.weather[0].description}`,
                humidity = `${weather.main.humidity}`,
                clouds = `${weather.clouds.all}`,
                visibility = `${weather.visibility}`,
                main = `${weather.weather[0].main}`,
                weatherFahrenheit; 
                weatherFahrenheit = (weatherTemp * 9) / 5 + 32;

                function roundToTwo(num) {
                    return +(Math.round(num + "e+2") + "e-2");
                }

                weatherFahrenheit = roundToTwo(weatherFahrenheit);

                res.render(`${origin}`, {
                    weather: weather,
                    place: place,
                    temp: weatherTemp,
                    pressure: weatherPressure,
                    icon: weatherIcon,
                    description: weatherDescription,
                    timezone: weatherTimezone,
                    humidity: humidity,
                    fahrenheit: weatherFahrenheit,
                    clouds: clouds,
                    visibility: visibility,
                    main: main,
                    error: null,
                });
            }
        }
    });

};


// Sets openWeatherMap call on post from form.
app.post('/', function(req,res){
    
    //Gets form element 

    let city = req.body.city;

    console.log(`${apiKey}`);

    //make API call 
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    renderWeather(url, 'index', res);
});

app.post('/zip', function(req,res){
    
    //Gets form element 

    let zip = req.body.zip.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

    console.log(`${apiKey}`);

    //make API call 
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=metric&appid=${apiKey}`;

    renderWeather(url, 'zip', res);
});

app.listen(5000, function(){
    console.log("Our Weather Application is listening on port 5000.")
});