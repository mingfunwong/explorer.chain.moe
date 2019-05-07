import { fromJS } from 'immutable';
import basicLayoutReducer from '../reducer';

describe('basicLayoutReducer', () => {
  it('returns the initial state', () => {
    expect(basicLayoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
