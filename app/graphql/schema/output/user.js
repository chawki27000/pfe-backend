import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
    name: 'allUser',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
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
        password: {
            type: GraphQLString
        },
        role: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLString
        }
    }
})
