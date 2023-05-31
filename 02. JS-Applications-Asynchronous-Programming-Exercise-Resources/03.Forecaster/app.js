const enumIcon={
    "Sunny": "&#x2600",
    "Partly sunny": "&#x26C5",
    "Overcast":	"&#x2601",
    "Rain": "&#x2614",
    "Degrees": "&#176"
}

const forecastContainer=document.getElementById('forecast');

function attachEvents() {
    document.getElementById("submit").addEventListener("click", getWeather);     

}

async function getWeather(){
    const urlLocation="http://localhost:3030/jsonstore/forecaster/locations";
    const townName=document.getElementById("location").value;
   try{
    const response=await fetch(urlLocation);
    const data=await response.json();

    const info=data.find(x=>x.name===townName);

    createForecaster(info.code);

   }catch{
    forecastContainer.style.display="block"
    forecastContainer.textContent="Error";
   }
}

async function createForecaster(code) {
    const currentSection=getElementById('current');
   
    const upcomingContainer=document.getElementById('upcoming');
   // const forecastSection=document.querySelector('#forecast');

    const urlToday=`http://localhost:3030/jsonstore/forecaster/today/${code}`;
    const urlUpcoming=`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
   // TODO use Promise.all instead
    try{
        const responseToday=await fetch(urlToday);
        const dataToday=await responseToday.json();
    
        const responseUpcoming=await fetch(urlUpcoming);
        const dataUpcoming=await responseUpcoming.json();
    
    
        forecastContainer.style.display='block';
        const todayHTMLTemp=createToday(dataToday);
        currentSection.appendChild(todayHTMLTemp);
    
        const upcommingHTMLTemp=createUpcoming(dataUpcoming);
        upcomingContainer.appendChild(upcommingHTMLTemp);
    }catch{
            forecastContainer.style.display='block';
            forecastContainer.textContent = "Error";
    }
}

function createUpcoming(data){
  const container=document.createElement('div');
  container.classList.add('forecast-info');

  data.forecast.forEach(data=>{
    const spanHolder=generateSpans(data);
    container.appendChild(spanHolder);
  });

  return container;

}

function generateSpans(data){
    const {condition,high,low}=data;
    const spanHolder=document.createElement('span');
    spanHolder.classList.add('upcoming');

    const iconSpan=document.createElement('span');
    iconSpan.classList.add('symbol');
    iconSpan.innerHTML=enumIcon[condition];

    const tempSpan=document.createElement('span');
    tempSpan.classList.add('forecast-data');
    tempSpan.innerHTML=`${low}${enumIcon["Degrees"]}}/${high}${enumIcon["Degrees"]}`

    
    const conditionSpan=document.createElement('span');
    conditionSpan.classList.add('forecast-data');
    conditionSpan.textContent = condition

    spanHolder.appendChild(iconSpan);
    spanHolder.appendChild(tempSpan);
    spanHolder.appendChild(conditionSpan);

    return spanHolder;
}
function createToday(data){
    const {condition, high, low} = data.forecast;
    const conditionContainer=document.createElement('div');
   

    conditionContainer.classList.add('forecast');

    const conditionIconSpan = document.createElement('span');
    conditionIconSpan.classList.add('condition');
    conditionIconSpan.innerHTML=enumIcon[condition];

    const conditionSpan=document.createElement('span');
    conditionSpan.classList.add('condition', 'symbol');

    const nameSpan=document.createElement('span');
    nameSpan.classList.add('forcast-data');
    nameSpan.innerHTML = data.name;

    const tempSpan=document.createElement('span');
    tempSpan.classList.add('forcast-data');
    tempSpan.innerHTML = `${low}${enumIcon["Degrees"]}}/${high}${enumIcon["Degrees"]}`;

    const conditionTxtSpan=document.createElement('span');
    conditionTxtSpan.classList.add('forecat-data');
    conditionTxtSpan.innerHTML = condition;

    conditionSpan.appendChild(nameSpan);
    conditionSpan.appendChild(tempSpan);
    conditionSpan.appendChild(conditionTxtSpan);

    conditionContainer.appendChild(conditionIconSpan);
    conditionContainer.appendChild(conditionSpan);

    return conditionContainer;
}

attachEvents();