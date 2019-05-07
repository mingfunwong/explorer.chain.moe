import { fromJS } from 'immutable';
import { assign, merge } from 'lodash/object';
import { handleActions } from 'redux-actions';
import { generateReduxRequest } from '../utils/reduxRest';

// base
const prefix = 'app/fibosChain/';
const generate = merge(
  generateReduxRequest('FO_EOS_PERCENT', prefix),
  generateReduxRequest('FO_MARKET_VALUE', prefix),
  generateReduxRequest('EOS_BANANCE', prefix),
);

// extend
const stateExtend = {};
const constantsExtend = {};
const actionExtend = {};
const reducerExtend = {};

// export
export const initialState = fromJS(assign(generate.state, stateExtend));
export const constantsTypes = assign(generate.constants, constantsExtend);
export const actionTypes = assign(generate.actions, actionExtend);
export const reducer = handleActions(
  assign(generate.reducer, reducerExtend),
  initialState,
);
