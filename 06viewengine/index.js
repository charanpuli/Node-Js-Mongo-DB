var express=require('express')
var app=express()
var path=require('path')
var port =process.env.PORT|| 3000


app.set('views',path.join(__dirname,'views'))

app.set('view engine','jade')

app.get('/',(req,res)=>{
    res.render("index2")
    
    
})
app.listen(port,()=>{
    console.log("serve is running at"+port);
    
})