var express =require('express')
var mongoose=require('mongoose')


var bodyparser=require('body-parser')
//bring all routes
var passport=require('passport')
var auth=require("./routes/api/auth")
var profile=require("./routes/api/profile")
var question=require("./routes/api/question")


var app=express()
var db=require('./setup/myurl').mongoURL
//middlewares
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

//connect to database

mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(()=>console.log("mongodb connected succesffully"))
    .catch(err=>console.log(err))

//passport middle-ware
app.use(passport.initialize())
//config for JWT strategy
require("./strategies/jsonwtStrategy")(passport)

app.get('/',(req,res)=>{
    res.send('hey hello im on puli')
})

//actual routes
app.use('/api/auth',auth)
app.use('/api/profile',profile)
app.use('/api/question',question)

var port =process.env.PORT || 3000

app.listen(port,()=>{
  console.log(`app is running at ${port}`);
    
})