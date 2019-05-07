import { fromJS } from 'immutable';
import { assign, merge } from 'lodash/object';
import { handleActions } from 'redux-actions';
import { generateReduxRequest, requestTypes } from '../utils/reduxRest';

// base
const prefix = 'app/currentChain/';
const generate = merge(
  generateReduxRequest('CHAIN_INFO', prefix),
  generateReduxRequest('CHAIN_STATS', prefix),
  generateReduxRequest('CHAIN_GLOBAL', prefix),
  generateReduxRequest('CHAIN_RAMMARKET', prefix),
  generateReduxRequest('CHAIN_BLOCK', prefix),
  generateReduxRequest('CHAIN_INFO_BLOCK', prefix),
  generateReduxRequest('HISTORY_BLOCK_FIBOS', prefix),
  generateReduxRequest('HISTORY_BLOCK_ENUMIVO', prefix),
  generateReduxRequest('CHAIN_PRODUCERS', prefix),
  generateReduxRequest('CHAIN_ACCOUNT', prefix),
  generateReduxRequest('CHAIN_ACCOUNT_FROM_TABLE', prefix),
  generateReduxRequest('CHAIN_ABI', prefix),
  generateReduxRequest('CHAIN_RAW_CODE_AND_ABI', prefix),
  generateReduxRequest('CHAIN_TRANSACTION', prefix),
  generateReduxRequest('CHAIN_ACTIONS', prefix),
);

// extend
const itemsLengthLimit = 10;
const stateExtend = {
  chainBlocks: requestTypes([]),
  chainTxs: requestTypes([]),
  chainTxs: requestTypes([]),
};
const constantsExtend = {
  CHAIN_BLOCKS_PUSH: `${prefix}CHAIN_BLOCKS_PUSH`,
  CHAIN_TXS_PUSH: `${prefix}CHAIN_TXS_PUSH`,
};
const actionExtend = {
  chainBlocksPush: payload => ({
    type: constantsExtend.CHAIN_BLOCKS_PUSH,
    payload,
  }),
  chainTxsPush: payload => ({ type: constantsExtend.CHAIN_TXS_PUSH, payload }),
};
const reducerExtend = {
  [constantsExtend.CHAIN_BLOCKS_PUSH]: (state, action) =>
    state
      .updateIn(['chainBlocks', 'payload'], arr => arr.unshift(action.payload))
      .updateIn(['chainBlocks', 'payload'], arr => arr.take(itemsLengthLimit)),
  [constantsExtend.CHAIN_TXS_PUSH]: (state, action) =>
    state
      .updateIn(['chainTxs', 'payload'], arr => arr.unshift(action.payload))
      .updateIn(['chainTxs', 'payload'], arr => arr.take(itemsLengthLimit)),
};

// export
export const initialState = fromJS(assign(generate.state, stateExtend));
export const constantsTypes = assign(generate.constants, constantsExtend);
export const actionTypes = assign(generate.actions, actionExtend);
export const reducer = handleActions(
  assign(generate.reducer, reducerExtend),
  initialState,
);
