const request = require('request');
const forecast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bce3a43421cb202c4ee0b4169e85e27c&query='+latitude+','+longitude;
    request({url: url,json:true},(error,response) => {
        if(error){
            callback('Error In fetching Weather Information..',undefined);
        }
        else if(response.body.error){
            callback('No Such Place exit with Given Co ordinates..',undefined);
        }
        else{
            if(response.body.current.temperature !== response.body.current.feelslike ){
            callback(undefined,'It is currently '+response.body.current.temperature+' degrees ,but it feels like '+response.body.current.feelslike+' outside');
            }
            else{
                callback(undefined,'It is currently '+response.body.current.temperature+' degrees outside');
            }
        }
    })
}
module.exports = forecast;