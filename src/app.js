const express = require('express');
const chalk = require('chalk');
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const { env } = require('process');
const app = express();
//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));
app.set('view engine', 'hbs');// used to set the dynamic view engine to hbs which is a npm library for dynamic templates
app.use(express.static(path.join(__dirname, '../public')));
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialPath);
app.set('views',viewPath);
app.get('/',(req,res) => {
    res.render('index',
    {
        title: 'Weather',
        name:'Pavan'
    }
    )
})
app.get('/about',(req,res) => {
    res.render('about',
    {
        name:'Pavan',
        title:'About this Page'
    })
})
app.get('/help',(req,res) => {
    res.render('help',
    {
        name:'Pavan',
        title:'Help Page'
    }
    )
})
app.get('/weather',(req, res) =>{
    if(!req.query.address){
        return res.send({
            error:'Address is Required..'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send(
                {
                    forecast:forecastData,
                    location,
                    address:req.query.address
                }
            )
        })
    })
    // res.send({
    //     address:req.query.address,
    //     weather:'Sunny'
    // })
})
app.get('/help/*',(req, res) =>{
    res.render('404', {
        description:'Help Article Not Found!!'
    }) // matches all urls with help/anything
})
app.get('*',(req, res) =>{
    res.render('404',
    {
        description:'ERROR PAGE!!!',
        name:'Pavan'
    }
    )
})
app.listen(port,()=>{
    console.log(chalk.bgGreen('Server listening on port 3000!!'));
});