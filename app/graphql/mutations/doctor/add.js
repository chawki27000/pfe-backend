import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import DoctorType from '../../schema/input/doctor';

import Doctor from '../../../models/doctor';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(DoctorType)
    }
  },
  async resolve (root, params, options) {
    const DoctorModel = new Doctor(params.data);
    const news = await DoctorModel.save();

    if (!news) {
      throw new Error('Error adding new doctor');
    }
    return true;
  }
};
