import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString
} from 'graphql';

import HospitalType from '../../schema/input/hospital';

import Hospital from '../../../models/hospital';

export default {
  type: GraphQLBoolean,
  args: {
    id: {
      name: 'id',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    const removed = await Hospital.remove({_id: params.id});

    if (!removed) {
      throw new Error('Error removing user');
    }
    return removed;
  }
};
