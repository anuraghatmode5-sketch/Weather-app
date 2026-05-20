let input = document.querySelector("#input");
let searchbtn = document.querySelector(".searchicon");

async function getweather(){

    let city = input.value.trim();
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=62eae6dc91f7c04be2329b6821a6b682&units=metric`);
    
    let data = await response.json();

    showdata(data);
    
}


function showdata(data){


    if(data.cod === "404"){

    alert("City not found");
    return;

}
     
     let main = document.querySelector(".main");
     main.style.background = "url(sun_weather.png)";


     let city = document.querySelector("#city");
     city.textContent = data.name;
     
     
     let country = document.querySelector("#country");
     country.textContent = data.sys.country;


     let day = document.querySelector("#day");
     day.textContent = new Date().toLocaleDateString("en-US",{
    weekday:"long"
});



     let date = document.querySelector("#date");
     date.textContent = new Date().toLocaleDateString("en-GB",{
    day:"numeric",
    month:"long",
    year:"numeric"
     });


     let mcimg = document.querySelector("#mcimg");
     let weather = data.weather[0].main;

     if(weather==="Clear"){
          main.style.backgroundImage = "url(sun_weather.png)";
          mcimg.src = "clear.png";
     }
     else if(
           weather === "Rain" ||
    weather === "Drizzle" ||
    weather === "Thunderstorm"
     ){
        main.style.backgroundImage = "url(rainy_weather.png)";
         mcimg.src = "rain.png";
     }
     else if(
         weather === "Clouds" ||
    weather === "Mist" ||
    weather === "Fog" ||
    weather === "Haze" ||
    weather === "Smoke"
     ){
         main.style.backgroundImage = "url(cloudy_weather.png)";
          mcimg.src = "clouds.png";
     }
     else{
         main.style.backgroundImage = "url(default.png)";
         mcimg.src = "mist.png";
     }



     let temperature = document.querySelector("#temperature");
     temperature.textContent = data.main.temp;


     let description = document.querySelector("#description");
     description.textContent = data.weather[0].description;


     let humidity = document.querySelector("#humidity");
    humidity.textContent = data.main.humidity;


     let windspeed = document.querySelector("#windspeed");
     windspeed.textContent = Math.round(data.wind.speed * 3.6);

     let pressure = document.querySelector("#pressure");
     pressure.textContent = data.main.pressure;


     let visibility = document.querySelector("#visibility");
     visibility.textContent = data.visibility / 1000;
       
}




searchbtn.addEventListener("click",()=>{
    getweather();
})

input.addEventListener("keydown",(e)=>{
      if(e.key === "Enter" && input.value.trim()!==""){
         getweather();
      }
})