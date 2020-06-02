
window.addEventListener("load",()=>{
    let lat;
    let lon;
    let tempData=document.querySelector(".temprature-degree");
    let timezoneData=document.querySelector(".location-timezone");
    let tempDescription=document.querySelector(".temprature-description");
    let temptype=document.querySelector(".temp-type");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(postion=>{
            lat=postion.coords.latitude;
            lon=postion.coords.longitude;

            const proxy='https://cors-anywhere.herokuapp.com/';
            var api = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon + '';

            fetch(api).then(
                response=>{
                    return response.json();
                }
            ).then(
                data=>{
                    console.log(data);
                    let temp=Math.round(data.main.temp);
                    const timezone=data.name;
                    const tempDes=data.weather[0].description;

                    tempData.textContent=temp;
                    timezoneData.textContent=timezone;
                    tempDescription.textContent=tempDes;

                    var skycons = new Skycons({"color": "white"});
                    if(tempDes==="haze"){
                        skycons.add(document.getElementById("icon1"), Skycons.CLOUDY);
                    }else if(tempDes==="broken clouds"){
                        skycons.add(document.getElementById("icon1"), Skycons.PARTLY_CLOUDY_DAY);
                    }else{
                        skycons.add(document.getElementById("icon1"), Skycons.CLEAR_DAY);
                    }
                    skycons.play();
                    
                    temptype.addEventListener("click",()=>{
                        if(temptype.textContent==="°C"){
                            temptype.textContent="°F";
                            tempData.textContent=convertD(tempData.textContent);
                        }else if(temptype.textContent==="°F"){
                            temptype.textContent="°C";
                            tempData.textContent=temp;
                        }
                        
                    });

            })
        });
    }
});

function convertD(num){
    num=Math.floor((num*(9/5))+32);
    return num;
}


// function getData(el){
//     if(el.keyCode==13){
//         //console.log(search.value);
//         const proxy='https://cors-anywhere.herokuapp.com/';
//         const city=search.value;
//         fetch(`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=25861bb7dc62eb3312caa27614ba9f24`).then(
//             (response)=>{
//                 return response.json();
//             }
//         ).then(
//             (data)=>{
//                 console.log(data);
//             }
//         );
//     }
// }