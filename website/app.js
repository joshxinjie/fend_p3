/* Global Variables */
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const API_KEY = "ee9644ed9115d0e3024939d94d6471c6";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById("generate").addEventListener("click", generateAction);

function generateAction(event) {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getWeather(BASE_URL, zip, API_KEY)
    .then(function(data){
        postWeather('/addWeatherData', {temperature: data.main.temp, date: newDate, userResponse: feelings});
        // updateUI();
    })
    .then(() => updateUI());
};

const getWeather = async(baseURL, zipCode, apiKey) => {
    if (zipCode.toString().length !== 5) {
		alert("Please enter a valid 5 digit US zip code!");
	} else {
        apiCallURL = `${baseURL}${zipCode}&appid=${API_KEY}&units=metric`;

        const request = await fetch(apiCallURL);
        try {
            const request = await fetch(apiCallURL);
            const data = await request.json();
            console.log(data);
            return data;
        } catch(error) {
            console.log("error", error);
        }
    }
};

const postWeather = async(url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

const updateUI = async() => {
    const request = await fetch('/getWeatherData');

    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature} °C`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.userResponse}`;
    } catch(error) {
        console.log("error", error);
    }
};