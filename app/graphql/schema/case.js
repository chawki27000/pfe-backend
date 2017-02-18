import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLID
} from 'graphql';

import {
    Drug
} from './drug'

const SignType = new GraphQLObjectType({
    name: 'Sign',
    fields: {
        types: {
            type: GraphQLString
        },
        gravity: {
            type: GraphQLInt
        },
        comment: {
            type: GraphQLString
        }
    }
});

const DrugsType = new GraphQLObjectType({
    name: 'Drugs',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        quantity: {
            type: GraphQLInt
        }
    }
});

export default new GraphQLObjectType({
    name: 'Case',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        doctor: {
            type: new GraphQLNonNull(GraphQLID)
        },
        child: {
            type: new GraphQLNonNull(GraphQLID)
        },
        taken_hour: {
            hour: {
                type: GraphQLInt
            },
            minute: {
                type: GraphQLInt
            }
        },
        taken_place: {
            type: GraphQLString
        },
        alone: {
            type: GraphQLBoolean
        },
        drugs: {
            type: new GraphQLList(DrugsType)
        },
        sign: {
            type: new GraphQLList(SignType)
        },
        state_child: {
            type: GraphQLString
        },
        glasgow_score: {
            type: GraphQLInt
        },
        diagnostic: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLString
        }
    }
});
