var express=require('express')
var router=express.Router();


router.get('/',(req,res)=>res.json({test : 'question is sucess'}))

module.exports=router