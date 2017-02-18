import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLID
} from 'graphql';

import DrugType from './schema/drug';

import Drug from '../models/drug';


const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        drug: {
            type: new GraphQLList(DrugType),
            description: 'A list of drug',
            resolve: (_, args) =>
                Drug.find()
        }
    }
});

export default new GraphQLSchema({
    query: queryType
});
