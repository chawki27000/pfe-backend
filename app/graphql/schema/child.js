import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

const AgeType = new GraphQLObjectType({
    name: 'Age',
    fields: {
        num:{
            type: GraphQLInt
        },
        types:{
            type: GraphQLInt
        }
    }
});

export default new GraphQLObjectType({
    name: 'Child',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        user: {
            type: new GraphQLNonNull(GraphQLID)
        }
        age: {
            type: new GraphQLObjectType(AgeType)
        },
        weight: {
            type: GraphQLFloat
        },
        school_mother: {
            type: GraphQLString
        },
        school_father: {
            type: GraphQLString
        },
        address_parent: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLString
        }

    }
});
