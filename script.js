const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");

const weatherIcon = document.getElementById("weather-icon");

async function checkWeather(city) {
    try{
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if(!response.ok){
            throw new Error("City not found");
        } 
        const json = await response.json();
        // console.log(json);

        document.getElementsByClassName("error")[0].style.display = "none";
        document.getElementsByClassName("weather")[0].style.display = "block";

        document.getElementsByClassName("city")[0].innerHTML = json.name;
        document.getElementsByClassName("temp")[0].innerHTML =  Math.round(json.main.temp) + "°C";

        if(json.weather[0].main === "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        else if(json.weather[0].main === "Rain"){
            weatherIcon.src = "images/rain.png";
        }
        else if(json.weather[0].main === "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(json.weather[0].main === "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(json.weather[0].main === "Mist"){
            weatherIcon.src = "images/mist.png";
        }
        else if(json.weather[0].main === "Snow"){
            weatherIcon.src = "images/snow.png";
        }

        document.getElementsByClassName("humidity")[0].innerHTML = json.main.humidity + "%";    
        document.getElementsByClassName("wind")[0].innerHTML = json.wind.speed + "Km/hr";
        
    } catch (error) {
        // console.error("there is error: " + error);
        document.getElementsByClassName("error")[0].style.display = "block";
        document.getElementsByClassName("weather")[0].style.display = "none";
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
});