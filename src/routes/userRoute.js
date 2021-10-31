const express = require ('express');
const { Passport } = require('passport');
const passport = require ('passport');
const router = express.Router();

const userController = require('../controllers/userController');


require ('../config/passport')(passport);;




router.get('/', userController);
router.post('/register', userController);
router.post('/login', passport.authenticate('local', {failureRedirect : '/login-failed', successRedirect : '/new-reflection' })
);
router.get('/register', userController);
router.get('/login', userController);
router.get('/procted-route', userController);
router.get('/logout', userController);
router.get('/login-success', userController);
router.get('/login-failed', userController);



module.exports = router;
