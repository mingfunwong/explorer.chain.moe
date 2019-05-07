import { fromJS } from 'immutable';
import bpsReducer from '../reducer';

describe('bpsReducer', () => {
  it('returns the initial state', () => {
    expect(bpsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
