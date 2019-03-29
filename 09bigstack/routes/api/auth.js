var express=require('express')
var router=express.Router();
var bcrypt=require('bcrypt')
var jsonwt=require('jsonwebtoken')
var passport=require('passport')
var key=require('../../setup/myurl')

router.get('/',(req,res)=>res.json({test : 'Auth is being tested'}))

//import scheme for person to register
// require("../../strategies/jsonwtStrategy")(passport)
var Person =require('../../models/Person')

router.post('/register',(req,res)=>{
    Person.findOne({email:req.body.email})
        .then(person=>{
            if(person){
                return res.status(400).json({emaailError: 'user already registered'})
            }
            else{
                var newPerson=new Person({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                    

                })
                //encrypt password usinhg bcrypt
                bcrypt.genSalt(10, (err, salt)=> {
                    bcrypt.hash(newPerson.password, salt, (err, hash)=> {
                        if (err) throw err
                        newPerson.password=hash
                        newPerson.save()
                            .then(person=>res.json(person))
                            .catch(err=>console.log(err))
                    });
                });

            }
        })
        .catch(err=>console.log(err))
})
//login field

router.post('/login',(req,res)=>{
    var email=req.body.email
    var password=req.body.password

    Person.findOne({email})
        .then(person=>{
           if(!person)
           {
               return res.status(404).json({emailerror:usernotfound})

           }
           
           
           bcrypt.compare(password,person.password)
            .then(iscorrect=>{
                if(iscorrect){
                    // res.json({success: "logged in successfully"})
                    //use payload and creat token for user
                    var payload={
                        id:person.id,
                        name:person.name,
                        email:person.email
                    }
                    jsonwt.sign(
                        payload,
                        key.secret,
                        {expiresIn:3600},
                        (err,token)=>{
                            res.json({
                                success:true,
                                token:"Bearer "+token

                            })
                        }
                    )
                }
                else{
                    res.status(400).json({passwordError : 'password incorrect'})
                }
            })


           if(person){

           }

        })
        .catch(err=>console.log(err)
        )
})

router.get('/profile',
        passport.authenticate("jwt",
        {session:false}),
        (req,res)=>{
            // console.log(req);
            res.json({
                id:req.user.id,
                name:req.user.name,
                email:req.user.email,
                profilepic:req.user.profilepic,
                gender:req.user.gender
            })
            
        }
        )

module.exports=router
