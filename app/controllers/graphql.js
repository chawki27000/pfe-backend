var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');



import mySchema from '../graphql/index';


// define default router
module.exports = function (app) {
  app.use('/graphql/', router);
};



router.use('/', graphqlHTTP({
  schema: mySchema,
  graphiql: true,
}));
