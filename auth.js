const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person');

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    try{
        console.log('received credentials:', USERNAME, password);
        const user = await person.findOne({username:USERNAME});
        if(!user)
            return done(null, false, {message:"incorrect username"});

        const matchPassword = user.password === password ? true : false;
        if(matchPassword){
            return done(null, user)
        }else{
            return done(null, false, {message: "password is incorrect"})
        }
    }
    catch(err){
        return done(err)
    }

}))

module.exports = passport;