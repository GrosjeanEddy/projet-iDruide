var input = document.querySelector('.input_text');
var city_name = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var icon = document.querySelector('.icon');
var date = document.querySelector('.date');
var button = document.querySelector('.submit');
/*var card = document.getElementById(showCard);*/

const url_api = "https://api.openweathermap.org/data/2.5/weather?q=";
/*const key_api = "50a7aa80fa492fa92e874d23ad061374";*/
const key_api = "2108ed8553316a563d7f6c52ea80f2be"; // new api key
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
fetch(url_api+input.value+'&lang=fr&units=metric&APPID='+key_api)
.then(response => response.json())
.then(data => {
  var tempValue = data.main.temp;
  var nameValue = data.name+', '+data.sys.country;
  var descValue = data['weather'][0]['description'];
  var iconValue = url_icon+data['weather'][0]['icon']+extend_url;
  
 console.log(data);
  city_name.innerHTML = nameValue;
  desc.innerHTML = ucFirst(descValue);
  temp.innerHTML = Math.round(tempValue)+ "°C";
  icon.innerHTML = "<img src="+iconValue+">";
  date.innerHTML = getCurrentDate();
  input.value ="";
  
})

.catch(err => alert(mess_err));
}

function ucFirst(str){
  return (str+'').charAt(0).toUpperCase()+str.substr(1);
}

function getCurrentDate(){
  var fullDate = new Date();
  
  return fullDate.getDate()+"/"+(fullDate.getMonth()+1)+"/"+fullDate.getFullYear();
}