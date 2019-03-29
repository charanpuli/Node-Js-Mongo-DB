const express=require('express')
const bodyparser=require('body-parser')
var path = require('path');
var app=express()

app.use(bodyparser.urlencoded({extended:false}))

app.use('/login',express.static(__dirname+'/public'))
console.log(__dirname);


app.get("/",(req,res)=>{
    res.send("This is home page")
})

app.post("/login",(req,res)=>{
    console.log(req.body);

    res.redirect("/")
})
app.listen(3000,()=>{
    console.log("server is running at 3000");
    
})