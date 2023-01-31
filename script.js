
// function sayhello()
// {
//   alert("Hello vro");
//   var a=5;
//   if(a==5){
//     var b=10
//
//   }
//   console.log(b);
// }
//console.log(b);
// const btn=document.getElementById("button-ah");
// btn.addEventListener("click",getLocation);

// function addNumbers()
// {
//   const n1=document.getElementById("n1").value;
//   const n2=document.getElementById("n2").value;
//   const sum=+n1 + +n2;
//   const resultDiv=document.getElementById("result");
//   resultDiv.innerHTML=sum;
// }
//
function getLocation()
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(async position=>{
    const lat=position.coords.latitude;
    const long=position.coords.longitude;
    console.log("lat: "+ lat + " long: "+long);
    const data = await getWeatherData(lat, long);
    renderWeatherData(data);
    var map = L.map('map').setView([+lat, +long], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([+lat, +long]).addTo(map);
    marker.bindPopup(data.name).openPopup();
    var circle = L.circle([+lat, +long],
      {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: 500
      }).addTo(map);

    map.on('click',async function(e){
      console.log("Let:"+e.latlng.lat +"Long: "+e.latlng.lng);
      const data = await getWeatherData(e.latlng.lat, e.latlng.lng);
      renderWeatherData(data);
      var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      marker.bindPopup(data.name).openPopup();
      var circle = L.circle([e.latlng.lat, e.latlng.lng],
        {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.1,
          radius: 500
        }).addTo(map);
    })
    })
  }
}
getLocation();


async function getWeatherData(lat,long)
{
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
  let response = await fetch(api);
  let data = await response.json();
  console.log(data);
  return data;
}

function renderWeatherData(data)
{
  document.getElementById("name").innerHTML = data.name;
  document.getElementById("temp").innerHTML = data.main.temp;
  document.getElementById("Min_temp").innerHTML = data.main.temp_min;
  document.getElementById("humidity").innerHTML = data.main.humidity;
  document.getElementById("Max_temp").innerHTML = data.main.temp_max;
}
