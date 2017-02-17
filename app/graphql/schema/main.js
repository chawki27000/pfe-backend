const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const roll = () => Math.floor(6 * Math.random()) + 1;

// root query
const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        diceRoll: {
            type: new GraphQLList(GraphQLInt),
            args: {
                count: {
                    type: GraphQLInt
                }
            },
            resolve: (_, args) => {
                let rolls = [];
                for (let i = 0; i < args.count; i++) {
                    rolls.push(roll());
                }
                return rolls;
            }
        }
    }
});

// declaration of schema
const mySchema = new GraphQLSchema({
    query: queryType
});

// export the module
module.exports = mySchema;
