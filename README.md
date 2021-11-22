# nic_weather_app

This is a Node JS based web application used to pull in weather data. This application is used on http://localhost:5000/ to access the local environment. 

**Required Dependencies:**
1. NodeJS (https://nodejs.org/en/download/). 
2. express
3. dotenv
4. body-parser
5. request
6. ejs

**API Access Token**
Before the application is ran, you will need to add an API token from https://home.openweathermap.org/api_keys (I can also provide you my API key via PM should the need arise for demoing purposes). Whenever you have your API key, navigate to the .env file, and save the key as "API_KEY=<your key here>". 


**In order to run:**

1. Pull repository down to local environment. 
2. Open Command Line and navigate to application. 
3. In command line, run "npm run start"
4. Open http://localhost:5000/. 
