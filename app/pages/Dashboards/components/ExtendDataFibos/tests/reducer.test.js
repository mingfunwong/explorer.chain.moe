import { fromJS } from 'immutable';
import extendDataFibosReducer from '../reducer';

describe('extendDataFibosReducer', () => {
  it('returns the initial state', () => {
    expect(extendDataFibosReducer(undefined, {})).toEqual(fromJS({}));
  });
});
