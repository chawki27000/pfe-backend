import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import DrugType from '../../schema/input/drug';

import Drug from '../../../models/drug';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(DrugType)
    }
  },
  async resolve (root, params, options) {
    const DrugModel = new Drug(params.data);
    const news = await DrugModel.save();

    if (!news) {
      throw new Error('Error adding new drug');
    }
    return true;
  }
};
