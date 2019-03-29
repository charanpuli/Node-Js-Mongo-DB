var JwtStrategy=require('passport-jwt').Strategy
var ExtractJwt=require('passport-jwt').ExtractJwt
var mongoose=require('mongoose')
var Person =mongoose.model('mydatabases')
var mykey=require('../setup/myurl')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = mykey.secret;


module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        Person.findById(jwt_payload.id)
            .then(person=>{
                if(person){
                    return done(null,person)
                }
                return done(null,false)
            })
            .catch(err=>{
                console.log(err);
                
            })
    }))
}