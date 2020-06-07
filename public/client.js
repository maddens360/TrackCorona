const API_URL = "https://api.covid19api.com/summary";
const geo_url = './latlon.json';

async function getTotal() {
  const response = await fetch(API_URL);
  const data = await response.json();
  const geo_response = await fetch(geo_url);
  const geo_data = await geo_response.json();
  console.log(data.Countries);


  console.log(geo_data);
}

getTotal();


const cmap = L.map("mapid").setView([0, 0], 1);
// cmap.addEventListener("zoom", function(){
//   try{
//     let zoomLv = this.getZoom();
//     this.circle.radius = 300 + 200000 / zoomLv;
//   }catch(err){console.log(err);}

// })
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: "your.mapbox.access.token",
}).addTo(cmap);
async function plot() {
  const response = await fetch(API_URL);
  const data = await response.json();
  const geo_response = await fetch(geo_url);
  const geo_data = await geo_response.json();
  for (let i = 0; i < data.Countries.length; i++) {
    try{
      let country = data.Countries[i];
      let latlon = geo_data[country.CountryCode.toLowerCase()];
      let lat = latlon.lat;
      let lon = latlon.long;
      let diameter = Math.sqrt(data.Countries[i].TotalConfirmed);
      document.getElementsByClassName("leaflet-interactive").innerHTML='';
      let circle = L.circle([lat, lon], {
        color: "orange",
        fillColor: "orange",
        fillOpacity: 0.4,
        radius: diameter * 300 + 150000,
      }).addTo(cmap);
      circle.addEventListener("")
      circle.addEventListener("click", function(){
        this.bringToBack();
        const marker = L.marker([lat, lon]).addTo(cmap);
        let popupContent = 
        `Country: ${country.Country}<br>
        Date: ${country.Date}<br>
        New Confirmed: ${country.NewConfirmed}<br>
        Total Confirmed: ${country.TotalConfirmed}<br>
        Total Deaths: ${country.TotalDeaths}<br>
        Total Recovered: ${country.TotalRecovered}`;
        marker.bindPopup(popupContent).openPopup();
        marker.addEventListener("popupclose", function(){
          this.remove();
        })
      });
    }
    catch(error){console.log(error); }
  } 
}

plot(); 

