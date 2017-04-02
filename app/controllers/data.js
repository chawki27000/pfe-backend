var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cors = require('cors');

var User = require('../models/user') // User ORM
var auth = require('../authentication/auth');
var secret = auth.secret;


// define default router
module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    // use body parser so we can get info from POST and/or URL parameters
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    // use morgan to log requests to the console
    app.use(morgan('dev'));

    app.use('/auth', router); // default route

};

// Protect route
// router.use(auth.authFunct);

// route
router.get('/', function(req, res) {
    res.send('AUTH route');
})

router.post('/login', function(req, res) {
    //find the user
    console.log(req.body.username + " : " + req.body.password)
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err; // error cas
        // test if user not exist in database
        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        }
        // test if user exist in database
        else if (user) {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if(!isMatch){
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                }
                else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        id: user._id,
                        token: token
                    });
                }
            })
        }
    });
})
