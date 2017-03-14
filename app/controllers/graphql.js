var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    cors = require('cors');

var graphqlHTTP = require('express-graphql');
var {
    buildSchema
} = require('graphql');

// Auth
var auth = require('../authentication/auth');

import mySchema from '../graphql/index';


// define default router
module.exports = function(app) {
    app.use('/graphql/', router);
};

// Protect route
// router.use(auth.authFunct);

router.use('/', cors(), graphqlHTTP({
    schema: mySchema,
    graphiql: true,
}));
