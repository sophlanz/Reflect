const mongoose = require ('mongoose')
const passport = require ('passport')
const LocalStrategy = require ('passport-local').Strategy;
const validatePassword = require ('../lib/passwordUtils').validatePassword

//import user model
const User = mongoose.model('User')

const fields = {
    usernameField : "email",
    passwordField: 'password'
};

//configure passport
const verifyCallback = (username, password, done) => {
    
        User.findOne({email : username})
            .then((user)=> {
                // console.log(user)
                if(!user) {return done(null,false)} // null (no error) false(no user)

                const isValid = validatePassword(password,user.hash, user.salt);
                if(isValid) {
                    return done(null,user);
                } else {
                    return done (null, false);
                }
            })
            .catch((err)=> {
                done(err);
            })

};

const strategy = new LocalStrategy(fields,verifyCallback);

passport.use(strategy);
passport.serializeUser((user,done)=>{ // passport goes into the DB, takes the user ID
        console.log(user.id)         // and then sends it to the session, the req.session.passport object.(the cookie)
    done(null,user.id)
});
passport.deserializeUser((userID,done)=> { //fetches the req.user object by using the userID
                                            // stored in the session. Then finds the user and returns 
                                            // the user to the req.user object.
    User.findById(userID)                   //Req.user doesn't exist when the user is signed out. 
    .then((user)=> {
        console.log(user)
        done(null,user)
    })
    .catch(err => done(err))
})

module.exports = (passport) => {};