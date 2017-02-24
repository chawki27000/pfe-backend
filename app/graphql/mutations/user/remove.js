import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString
} from 'graphql';

import UserType from '../../schema/input/user';

import User from '../../../models/user';

export default {
  type: GraphQLBoolean,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    const removed = await User.remove({_id: params.id});

    if (!removed) {
      throw new Error('Error removing user');
    }
    return removed;
  }
};
