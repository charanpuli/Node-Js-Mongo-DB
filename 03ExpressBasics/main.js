const express=require('express')
const app=express()


app.get('/',(req,res)=>{
    res.send('helloworld')
})
app.get('/about',(req,res)=>{
    res.send('<h1>iam i about page</h1>')
})
app.get('/contactus',(req,res)=>{
    res.send('Ph no. 7871725292')
})
app.get('/services/logo',(req,res)=>{
    res.send('logo ')
})
app.get('/services/web',(req,res)=>{
    res.send('web design')
})
app.get('/services/video',(req,res)=>{
    res.send('video')
})
app.get('/timings/:subject@:time',(req,res)=>{
    res.send(req.params)
})
app.get('/:name/:id/:sec',(req,res)=>{
    res.status(500).json({"name" : req.params.name,"id" : req.params.id,"sec" : req.params.sec})
})


app.delete('/delete',(req,res)=>{
    console.log('deleted successfully');
    res.send('deleted sucessfully')
    
})
app.listen(3000,()=>{
    console.log('Server is running at port : 3000');
    
})
