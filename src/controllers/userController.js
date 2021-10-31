const app = require('../app')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const express = require('express')
const router = express.Router();
const bcrypt = require ('bcrypt');
const { findOne } = require('../models/user');
const { route } = require('../app');
const passport = require('passport');
const genPassword = require ('../lib/passwordUtils').genPassword;
const validatePassword = require ('../lib/passwordUtils').validatePassword;
const isAuth = require ('../middlewares/authentication').isAuth;
const { isAdmin } = require('../middlewares/authentication');
require ('../config/passport')





//Homepage
router.get ("/",  (req,res,next)=> {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
})
//Register
router.post("/register", async (req,res,next)  => {
// try {
    const {username , email,password} = req.body;
    console.log({username , email, password} );
//Validate user input
if (!(username && email && password)) {
    res.status(400).send({message : "All input is required "});
}
//Check to see if user already exists
const oldUser = await User.findOne({ email });
if (oldUser) {
    res.status(409).send({message : "User already exists"})
    console.log(oldUser) }
// Check to see if username already exists. 
const oldUserName = await User.findOne({username})
if(oldUserName) {
    res.status(409).send({message : "Username already taken"})
    console.log(oldUserName)
}
const saltHash = genPassword(req.body.password);
    console.log(saltHash);
const salt = saltHash.salt
console.log(salt)
const hash = saltHash.hash
console.log(hash)

const newUser = await User.create ({
    username : req.body.username,
    email : req.body.email,
    salt : salt,
    hash : hash
    // admin : true
});
console.log(newUser);

// const newUser = new userSchema();
// newUser.username = req.body.username;
// newUser.email = req.body.email.toLowerCase();
// newUser.setPassword(req.body.password);

newUser.save() 
    .then((user) => {
        console.log(user)
    })

// ((err, newUser)=> {
//     if (err) return res.status(500).send({message :'There were problems saving your data'})
//     res.status(200).send({message : "user created successfully"})
// })
// const ecryptedPassword = setPassword(password);
// console.log(ecryptedPassword);
// //Create user and send to DB
// const newUser = await User.create({
//     username,
//     email : email.toLowerCase(),
//     password : ecryptedPassword
// });
// console.log(newUser);


res.redirect('/login');
// } catch(err){
//     res.status(404).json({message : err})
// }})
});
module.exports = router;



//GET ROUTES
//register
router.get('/register', (req,res,next)=> {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Email:<br><input type="email" name="email">\
                    <br>Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
});
//log in
router.get('/login', (req,res,next)=> {
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Email:<br><input type="email" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
});

//protected route
router.get('/protected-route', isAuth, (req,res,next) => {
    res.send('you have access to this route')
    
});
router.get('/admin-route', isAdmin, (req,res,next) => {
    res.send('you are an admin')
    
});
//log user out
router.get('/logout', (req,res,next)=> {
    req.logout();
    res.redirect('/protected-route')
});

//login-success
router.get('/login-success', (req,res,next)=> {
    res.send('<p>You have logged in successfully <a href= "/protected-route">Go to protected Route</a><p>')
    res.redirect('/new-reflection')
});
//login-failure
router.get('/login-failed', (req,res,next)=> {
    res.send("You have entered the wrong password")
});