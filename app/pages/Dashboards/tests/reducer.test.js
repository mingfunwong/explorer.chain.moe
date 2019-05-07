import { fromJS } from 'immutable';
import dashboardsReducer from '../reducer';

describe('dashboardsReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
