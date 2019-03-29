var express =require('express')
var passport =require('passport')
var Strategy=require('passport-facebook').Strategy

passport.use(new Strategy({
    clientID:"1050329261813455",
    clientSecret:"931dc11ba8bfff731afe327dc46eb0da",
    callbackURL:"http://localhost:3000/login/facebook/return"
    
},function(accessToken,refreshToken,profile,cb){
    return cb(null,profile)
        }
    )
)
passport.serializeUser(function(user,cb){
    cb(null,user)
})
passport.serializeUser(function(obj,cb){
    cb(null,obj)
})

var app=express()
app.set("views",__dirname+"/views")
app.set("view engine","ejs")

app.use(require('morgan')('combined'))
app.use(require('body-parser').urlencoded({extended:true}))
//app.use(require('body-parser')())
app.use(require('express-session')({secret:'my app',resave:true,
saveUninitialized:true}))


//@rouate       -  GET   /home


app.get('/',(req,res)=>{
    res.render('home',{
        user: req.user
    })
})
app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  app.get('/profile',require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
      res.render('profile',{user :req.user})

  })
app.listen(3000)
