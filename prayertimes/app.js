var x = document.getElementById("demo");
var y = document.getElementById("json");
var date = new Date();
var month = Date.getMonth;
var year = Date.getFullYear();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    var currentdate = new Date();
    var cmonth = currentdate.getMonth()+1;
    var cyear = currentdate.getFullYear();
    var day = currentdate.getDate();
  /* x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude; */

   //Create query for the API.
   var latitude = "latitude=" + position.coords.latitude;
   var longitude = "&longitude=" + position.coords.longitude;
   var query = latitude + longitude + "&localityLanguage=en";

   const Http = new XMLHttpRequest();

   var bigdatacloud_api =
     "https://api.bigdatacloud.net/data/reverse-geocode-client?";

   bigdatacloud_api += query;

   Http.open("GET", bigdatacloud_api);
   Http.send();
   var idcity = document.getElementById("city");
   var idcountry = document.getElementById("country");

   Http.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
       var myObj = JSON.parse(this.responseText);
       console.log(myObj);
       var city =myObj.city;
       var country = myObj.countryName;
       
        idcity.innerHTML += city;
        idcountry.innerHTML += country;
      // y.innerHTML +=  "City = " + city + "<br>Country = " + country + "<br>month = " + cmonth + "<br>year = " + cyear;
     }

     var prayer_api = "http://api.aladhan.com/v1/calendarByCity?city="+myObj.city+"&country="+myObj.countryName;

   Http.open("GET", prayer_api);
   Http.send();

   var fajr = document.getElementById("fajr");
   var duhr = document.getElementById("duhr");
   var asr = document.getElementById("asr");
   var maghrib = document.getElementById("maghrib");
   var ichaa = document.getElementById("ichaa");
   

   Http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var prayer = JSON.parse(this.responseText);
      console.log(prayer.data[0].timings.Fajr);
      fajr.innerHTML +=  prayer.data[day].timings.Fajr;
      duhr.innerHTML +=  prayer.data[day].timings.Dhuhr;
      asr.innerHTML +=  prayer.data[day].timings.Asr;
      maghrib.innerHTML +=  prayer.data[day].timings.Maghrib;
      ichaa.innerHTML +=  prayer.data[day].timings.Isha;
    }
  };
   };

   

}





