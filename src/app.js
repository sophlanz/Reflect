require("dotenv").config();
require("./config/database").connect();
require('./models/user');
const express = require("express");
const cors = require('cors');
const session = require ('express-session');
const { mongo, connection } = require("mongoose");
const MongoStore = require ('connect-mongo')(session);
const secret = process.env.JWT_SECRET
const passport = require ('passport');
const userRoutes = require ('../src/routes/userRoute');
const reflectionRoutes = require ('../src/routes/reflectionRoute');



// const authRoute = require ('../src/routes/authRoute');

//create express app
const app = express();

app.use(express.json()) // built-in express parser


//set up body parser
app.use(express.urlencoded({extended : true}));



//set up cors
app.use(cors());
//set up session

const sessionStore = new MongoStore ({
    mongooseConnection : connection,
    collection : "sessions"
})

//set up session
app.use(session({
    secret : secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge : 1000 * 60 * 60 * 24  //expires in 1 day

    }

}))
//debugging
app.use((req,res,next)=> {
    // console.log(req.session); // request from the session
    // console.log(req.user); // request from passport
    next();
});
// passport authentication
require('../src/config/passport');
app.use(passport.initialize());
app.use(passport.session());
//Connect user route
app.use ('/', userRoutes);
app.use('/', reflectionRoutes);

// app.use('/', postRoutes);
// app.use("/user", userController);
// app.use("/", userController); // base url
// app.use("/register", userController);
// app.use("/login", userController);
// app.use("/login-success", userController);
// app.use("/login-failed", userController);
// app.use("/protected-route", userController);
// app.use("/logout", userController);
// app.use('/new-post', require('../src/controllers/postController'))
// app.use('/auth', authRoute);

module.exports = app;
