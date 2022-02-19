const request=require("request")

const forecast=(latitude,longitude,callback)=>{
    const url="https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=30039aedc62d001600f7abe953024d6f"
    request({url:url, json:true},(error, response)=>{
        if(error){
            callback("Unable to connect to weather service",undefined)
        } else if(response.body.error){
            callback("Unable to find the location, Try another search",undefined)
        } else {
            callback(undefined,`The temprature is ${response.body.current.temp} degrees. It's ${response.body.current.weather[0].description} out there!!`)
        }
    })
}

module.exports=forecast