var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

var Drug = require('../models/drug');

// define default router
module.exports = function (app) {
  app.use('/graphql/', router);
};

// root query
const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        drug: {
            type: GraphQLInt,
            resolve: (_, args) =>
                Drug.count()
        }
    }
});

const mySchema = new GraphQLSchema({
    query: queryType
});

router.use('/', graphqlHTTP({
  schema: mySchema,
  graphiql: true,
}));
