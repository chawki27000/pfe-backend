import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

const AgeType = new GraphQLInputObjectType({
    name: 'Age',
    fields: {
        num:{
            type: GraphQLInt
        },
        types:{
            type: GraphQLString
        }
    }
});

export default new GraphQLInputObjectType({
    name: 'Child',
    fields: {
        user: {
            type: GraphQLID
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
