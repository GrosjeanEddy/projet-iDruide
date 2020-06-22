var input = document.querySelector('.input_text');
var city_name = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var icon = document.querySelector('.icon');
var button = document.querySelector('.submit');

const url_api = "https://api.openweathermap.org/data/2.5/weather?q=";
key_api = "50a7aa80fa492fa92e874d23ad061374";
const url_icon = "https://openweathermap.org/img/w/";
const extend_url = ".png";

const mess_err = "Wrong city name, retry.";

button.addEventListener('click', getWeather);

input.addEventListener('keypress', function(event){
  if (event.key == 'Enter') {
		getWeather();
	}
})

function getWeather(){
fetch(url_api+input.value+'&lang=fr&units=metric&appid='+key_api)
.then(response => response.json())
.then(data => {
  var tempValue = data.main.temp;
  var nameValue = data.name+', '+data.sys.country;
  var descValue = data['weather'][0]['description'];
  var iconValue = url_icon+data['weather'][0]['icon']+extend_url;

  city_name.innerHTML = nameValue;
  desc.innerHTML = descValue;
  temp.innerHTML = Math.round(tempValue)+ "°C";
  icon.innerHTML = "<img src="+iconValue+">";
  input.value ="";

})

.catch(err => alert(mess_err));
}