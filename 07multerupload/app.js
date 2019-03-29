var express=require('express')
var ejs=require('ejs')
var multer=require('multer')
var path=require('path')

var app=express()
var port =process.env.PORT || 3000

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myupload')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+
      path.extname(file.originalname))
    }
  })
   
  var upload = multer({ 
      storage: storage 
      
      
    }).single('profilepic')


app.set('view engine','ejs')

app.use(express.static('./public'))
app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/upload',(req,res)=>{
    upload(req,res,error=>{
        if(error){
            res.render('index',{
                message:error
            })
        }else{
            res.render('index',{
                message:'succesfully uploaded',
                filename:`myupload/${req.file.filename}`
            })
        }
    })
})
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
    
})

