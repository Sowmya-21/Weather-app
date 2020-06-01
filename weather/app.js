window.addEventListener('load',()=> {
let long,lat;
//check if device's location is allowed to access
let temperatureDescription=document.querySelector(".temperature-description");
let temperatureDegree=document.querySelector(".temperature-degree");
let locationTimezone=document.querySelector(".location-timezone");
let temperatureSection=document.querySelector(".temperature");
const iconElement = document.querySelector(".weather-icon"); 
const temperatureSpan=document.querySelector(".temperature span");   
    if(navigator.geolocation){
        //return current position
         navigator.geolocation.getCurrentPosition(position=>{
            console.log(position);
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy="https://cors-anywhere.herokuapp.com/";
         const api=`${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=93892159cf434a5e9c38c2851e1e7ddb`;
        //fetching information from the url    
            fetch(api).then(response =>{
       return response.json();
   })
    .then(data =>{
                console.log(data);
    //get temperature from data.main            
      const {temp} =data.main;
    //set DOM elements from API         
     temperatureDegree.textContent=(temp-273).toFixed(2);//(temp-273).toFixed(2);
      temperatureDescription.innerHTML=data.weather[0].description;
      locationTimezone.textContent=data.name + "/" + data.sys.country;
      //set icon
      iconElement.innerHTML = `<img src="icons/${data.weather[0].icon}.png"/>`;
    //faharenheit conversion 
    let faharenheit=(((temp-273).toFixed(2))*(9/5))+32;
                   
      //change temperature to celsius/farhenheit 
     temperatureSection.addEventListener('click',()=>{
         if(temperatureSpan.textContent==="°C"){
             temperatureSpan.textContent="°F";
             temperatureDegree.textContent=faharenheit.toFixed(2);
         }
         else {
             temperatureSpan.textContent="°C";
             temperatureDegree.textContent=(temp-273).toFixed(2);
          }
       }) 

       });
   });
}
    else {
      notifyElement.style.display = "block";
      notifyElement.innerHTML="<p>Browser doesn't support geolocation</p>";
    }
});