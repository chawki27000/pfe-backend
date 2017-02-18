import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import CaseType from '../../schema/input/case';

import Case from '../../../models/case';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(CaseType)
    }
  },
  async resolve (root, params, options) {
    const CaseModel = new Case(params.data);
    const news = await CaseModel.save();

    if (!news) {
      throw new Error('Error adding new comment');
    }
    return true;
  }
};
