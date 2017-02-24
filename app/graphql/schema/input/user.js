import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'User',
    fields: {
        username:{
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        passwordHash: {
            type: GraphQLString
        },
        passwordSalt: {
            type: GraphQLString
        },
    }
})
