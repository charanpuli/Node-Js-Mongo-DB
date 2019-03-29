// var express=require('express')
// var app=express()
// var midle=function (req,res,next) {
//     console.log("Middle ware working here");
//     next()
    
    
// }

// app.use(midle)
// app.get('/',(req,res)=>{
//     res.send('hola lo siento!! ')
//     console.log('holaaa!!!!!!');
    
// })
// app.listen(3000,()=>{
//     console.log("server is running at 3000");
    
// })
var express = require('express');
var app = express();

//Middleware function to log request protocol
app.use('/things', function(req, res, next){
   console.log("A request for things received at " + Date.now());
   next();
});

// Route handler that sends the response
app.get('/things', function(req, res){
   res.send('Things');
});

app.listen(3000);