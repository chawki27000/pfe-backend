import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import ChildType from '../../schema/output/child';

import Child from '../../../models/child';


export default {
    type: new GraphQLList(ChildType),
    description: 'A list of children',
    resolve: (_, args) =>
        Child.find()
}
