import { createSelector } from 'reselect';
import { initialState as currentChainInitialState } from '../actions/currentChain';
import { initialState as fibosChainInitialState } from '../actions/fibosChain';

const makeSelectFibosChain = () =>
  createSelector(
    state => state.get('fibosChain', currentChainInitialState),
    substate => substate.toJS(),
  );

const makeSelectCurrentChain = () =>
  createSelector(
    state => state.get('currentChain', fibosChainInitialState),
    substate => substate.toJS(),
  );

export { makeSelectFibosChain, makeSelectCurrentChain };
