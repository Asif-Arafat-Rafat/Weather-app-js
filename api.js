document.addEventListener("DOMContentLoaded", function () {
  const link = "https://geocoding-api.open-meteo.com/v1/search?";
  const loc = document.querySelector(".search input");

  async function apiaccess(city) {
    const response = await fetch(link + "name=" + city + "&count=1");
    var data = await response.json();
    console.log(data)
    const flink =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      data.results[0].latitude +
      "&longitude=" +
      data.results[0].longitude +
      "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,is_day,weather_code";
    const response1 = await fetch(flink);
    if(!data.results[0].admin2){
      document.querySelector(".city").innerHTML = data.results[0].country;
    }
    else{
      document.querySelector(".city").innerHTML = data.results[0].admin2+","+data.results[0].country;
    }
   
    var data = await response1.json();
    console.log(data);
    if(data.current.is_day===0){
      document.querySelector(".card").className="card night"
      console.log(document.querySelector(".card").className)
    }
    else{
      document.querySelector(".card").className="card day"
    }
    console.log(document.querySelector(".card").className)

    document.querySelector(".temp").innerHTML =
      data.current.temperature_2m + "°C";
    document.querySelector(".wind").innerHTML =
      data.current.wind_speed_10m + "km/h";
    document.querySelector(".humidity").innerHTML =
      data.current.relative_humidity_2m + "%";
  }
  const buttoncli = document.querySelector(".sbutton");
  buttoncli.addEventListener("click", () => {
    apiaccess(loc.value);
  });
  loc.addEventListener("keydown",(event)=>{
    if (event.key==="Enter"){
      apiaccess(loc.value);
    }
  })
});
