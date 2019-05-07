import { call, put, select, takeLatest } from 'redux-saga/effects';
import { eos } from 'utils/blockchain';
import request from 'utils/request';
import {
  actionTypes as currentChainActionTypes,
  constantsTypes as currentChainConstantsTypes,
} from '../actions/currentChain';
import { actionTypes, constantsTypes } from '../actions/fibosChain';
import { getChainStats } from './currentChain';
import { makeSelectCurrentChain, makeSelectFibosChain } from '../selectors';

export function* getEosBanance() {
  try {
    const rows = yield call(eos.chain.getAccount, 'fiboscouncil');
    yield put(actionTypes.eosBananceSuccess(rows));
  } catch (err) {
    console.log({ err });
    yield put(actionTypes.eosBananceFailure(err));
  }
}

export function* getFoEosPercent() {
  try {
    yield call(currentChainActionTypes.chainStatsRequest);
    const { chainStats } = yield select(makeSelectCurrentChain());
    const res = chainStats.payload.rows[0];
    // http://t.cn/EIJw8JO
    const foEosPercent =
      (res.connector_weight *
        (parseFloat(res.reserve_supply) + parseFloat(res.supply))) /
      (parseFloat(res.reserve_connector_balance) +
        parseFloat(res.connector_balance));
    yield put(actionTypes.foEosPercentSuccess(foEosPercent));
  } catch (err) {
    console.log({ err });
    yield put(actionTypes.foEosPercentFailure(err));
  }
}

export function* getFoMarketValue() {
  try {
    const { chainStats } = yield select(makeSelectCurrentChain());
    const { foEosPercent } = yield select(makeSelectFibosChain());
    const foSupply = parseFloat(chainStats.payload.rows[0].supply);
    const rows = yield call(request, eos.extend.coinmarketcapEosUrl);
    const price = { USD: rows.data.quotes.USD.price };
    const maketValue = (price.USD * foSupply) / foEosPercent.payload;
    yield put(actionTypes.foMarketValueSuccess(maketValue));
  } catch (err) {
    console.log({ err });
    yield put(actionTypes.foMarketValueFailure(err));
  }
}

export default function* fibosChainSaga() {
  yield takeLatest(constantsTypes.FO_EOS_PERCENT_REQUEST, getChainStats);
  yield takeLatest(
    currentChainConstantsTypes.CHAIN_STATS_SUCCESS,
    getFoEosPercent,
  );
  yield takeLatest(constantsTypes.FO_EOS_PERCENT_SUCCESS, getFoMarketValue);
  yield takeLatest(constantsTypes.EOS_BANANCE_REQUEST, getEosBanance);
}
