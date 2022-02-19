const path=require("path")
const express=require("express")
const hbs=require("hbs")
const forecast=require("./utils/forecast")
const geocode=require("./utils/geocode")
const { forever } = require("request")

const app=express()
const port=process.env.PORT || 3000

//Defining paths for express config
const publicDirecPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirecPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Kushagra Agrawal"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About page",
        name:"Kushagra Agarwal"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:"Feel free to reach out to us. We are always there for you!!!",
        title:"Help Page",
        name:"Kushagra Agrawal"
    })
})

app.get('/weather',(req,res)=>{
    let address=req.query.address
    if(!address){
        return res.send({
            error:"Please enter a location to get the weather!"
        })
    }

    geocode(address,(error,data)=>{
        if(error){
            return res.send({
                error:error
            })
        }
    
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
        if(error){
            return res.send({
                error:error
            })
        }
        res.send({
            location:data.location,
            forecast:forecastData,
            address:address
        })
    })
})
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must search something!"
        })
    }
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error_msg:"Help article doesn't exists!",
        title:"Error 404",
        name:"Kushagra Agrawal"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error_msg:"Page not found!",
        title:"Error 404",
        name:"Kushagra Agrawal"
    })
})

app.listen(port,()=>{
    console.log("Server is up on port "+ port)
})