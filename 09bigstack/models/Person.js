var mongoose =require('mongoose')
var Schema=mongoose.Schema

var PersonSchema=new Schema({
    name:{
        type :String,
        required:true
    },
    email:{
        type :String,
        required:true
    },
    password:{
        type :String,
        required:true
    },
    profilepic:{
        type :String,
        default: 'https://www3.shutterstock.com/base/public/images/favicons/apple-touch-icon-57x57-a2668e60d4.png'
    },
    date:{
        type :Date,
        default:Date.now
    },
    gender:{
        type :String,
        required:true
    }
})


module.exports= Person = mongoose.model("mydatabases",PersonSchema)