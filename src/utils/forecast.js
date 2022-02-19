const request=require("request")

const forecast=(latitude,longitude,callback)=>{
    const url="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=30039aedc62d001600f7abe953024d6f"
    request({url:url, json:true},(error, response)=>{
        if(error){
            callback("Unable to connect to weather service",undefined)
        } else if(response.body.error){
            callback("Unable to find the location, Try another search",undefined)
        } else {
            const currenttemp=response.body.current.temp
            const description=response.body.current.weather[0].description
            const humidity=response.body.current.humidity
            const wind_speed=response.body.current.wind_speed
            const maxTemp=response.body.daily[0].temp.max
            const minTemp=response.body.daily[0].temp.min
            callback(undefined,`The current temprature is ${currenttemp} degrees. The humidity is ${humidity}%.
            The wind speed is ${wind_speed}m/s. The maximum and minimum temperature for the day is ${maxTemp} and
            ${minTemp} degrees respectively. Overall it's ${description} out there!!`)
        }
    })
}

module.exports=forecast