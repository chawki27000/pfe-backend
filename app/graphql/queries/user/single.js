import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import UserType from '../../schema/output/user';

import User from '../../../models/user';


export default {
    type: new GraphQLList(UserType),
    description: 'A user by EMAIL',
    args: {
        email: {
            type: GraphQLString,
        }
    },
    resolve: (_, args) =>
        User.find({email: args.email})
}
