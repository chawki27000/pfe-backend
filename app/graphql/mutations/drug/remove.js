import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString
} from 'graphql';

import DrugType from '../../schema/input/drug';

import Drug from '../../../models/drug';

export default {
  type: GraphQLBoolean,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    const removed = await Drug.remove({_id: params.id});

    if (!removed) {
      throw new Error('Error removing user');
    }
    return removed;
  }
};
