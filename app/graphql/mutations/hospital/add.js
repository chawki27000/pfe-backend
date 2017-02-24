import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import HospitalType from '../../schema/input/hospital';

import Hospital from '../../../models/hospital';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(HospitalType)
    }
  },
  async resolve (root, params, options) {
    const HospitalModel = new Hospital(params.data);
    const news = await HospitalModel.save();

    if (!news) {
      throw new Error('Error adding new hospital');
    }
    return true;
  }
};
