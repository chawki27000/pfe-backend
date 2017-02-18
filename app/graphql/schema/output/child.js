import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

const AgeType = new GraphQLObjectType({
    name: 'allAge',
    fields: {
        num:{
            type: GraphQLInt
        },
        types:{
            type: GraphQLString
        }
    }
});

export default new GraphQLObjectType({
    name: 'allChild',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        user: {
            type: new GraphQLNonNull(GraphQLID)
        },
        age: {
            type: AgeType
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
