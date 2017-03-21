import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import ChildType from '../../schema/input/child';
import ChildTypeOut from '../../schema/output/child';

import Child from '../../../models/child';

export default {
  type: ChildTypeOut,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(ChildType)
    }
  },
  async resolve (root, params, options) {
    const ChildModel = new Child(params.data);
    const news = await ChildModel.save();

    if (!news) {
      throw new Error('Error adding new child');
    }
    return ChildModel
  }
};
