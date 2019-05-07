import { delay } from 'redux-saga';
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { assign, merge } from 'lodash/object';
import { uniq } from 'lodash';
import { actionTypes, constantsTypes } from '../actions/currentChain';
import { current } from '../utils/blockchain';
import request from '../utils/request';
import { makeSelectCurrentChain } from '../selectors';

export function* getChainInfo() {
  try {
    const info = yield call(current.chain.getInfo, {});
    const { chainInfo } = yield select(makeSelectCurrentChain());
    if (
      chainInfo.usable &&
      chainInfo.payload.head_block_id === info.head_block_id
    ) {
      return;
    }
    yield put(actionTypes.chainInfoSuccess(info));
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainInfoFailure(err));
  }
}

export function* getChainStats() {
  try {
    const stats = yield call(
      current.chain.getTableRows,
      true,
      current.extend.contractEosioToken,
      current.extend.contractEosio,
      'stats',
    );
    yield put(actionTypes.chainStatsSuccess(stats));
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainStatsFailure(err));
  }
}

export function* getChainGlobal() {
  try {
    const global = yield call(
      current.chain.getTableRows,
      true,
      current.extend.contractEosio,
      current.extend.contractEosio,
      'global',
    );
    const res = global.rows[0];
    const ramUsed = parseInt(res.total_ram_bytes_reserved / 1024 / 1024 / 1024);
    const ramMax = parseInt(res.max_ram_size / 1024 / 1024 / 1024);
    const ramPercent = `${ramUsed} / ${ramMax}`;
    yield put(actionTypes.chainGlobalSuccess({ ...global, ramPercent }));
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainGlobalFailure(err));
  }
}

export function* getChainRammarket() {
  try {
    const rammarket = yield call(
      current.chain.getTableRows,
      true,
      current.extend.contractEosio,
      current.extend.contractEosio,
      'rammarket',
    );
    const res = rammarket.rows[0];
    // http://t.cn/EIJZUjB
    const kbPrice =
      (1024 * parseFloat(res.quote.balance)) / parseFloat(res.base.balance);
    yield put(actionTypes.chainRammarketSuccess({ ...rammarket, kbPrice }));
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainRammarketFailure(err));
  }
}

export function* getChianBlock(chainInfo) {
  try {
    const blockNumber = chainInfo.payload.blockNumber;
    const block = yield call(current.chain.getBlock, blockNumber);
    yield put(actionTypes.chainBlockSuccess(block));
    yield call(getChianTxs, block);
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainBlockFailure(err));
  }
}

export function* getChianInfoBlock(chainInfo) {
  try {
    const blockId = chainInfo.payload.head_block_num;
    const { chainBlock } = yield select(makeSelectCurrentChain());
    if (chainBlock.usable && chainBlock.payload.block_num === blockId) {
      return;
    }
    const block = yield call(current.chain.getBlock, blockId);
    const blockTypes = {
      block_num: block.block_num,
      trxCount: block.transactions.length,
      timestamp: block.timestamp,
      producer: block.producer,
    };

    yield put(actionTypes.chainInfoBlockSuccess(block));
    yield put(actionTypes.chainBlocksPush(blockTypes));
    yield call(getChianTxs, block);
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainInfoBlockFailure(err));
  }
}

export function* getChianTxs(block) {
  try {
    const transactions = block.transactions;
    const txs = [];
    transactions.map(
      tx =>
        tx.trx.transaction &&
        tx.trx.transaction.actions.map(act =>
          txs.push({
            id: tx.trx.id,
            actor: act.authorization.map(auth => auth.actor),
            account: act.account,
            name: act.name,
            data: act.data,
          }),
        ),
    );
    for (const index in txs) {
      yield put(actionTypes.chainTxsPush(txs[index]));
      yield delay(500 / txs.length);
    }
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chianTxsFailure(err));
  }
}

export function* getHistoryBlockFibos() {
  try {
    const stats = yield call(request, current.extend.fibosRocksStatsUrl);
    const blocks = stats.blocks.reverse();
    const txs = stats.transactions.reverse().map(tx => ({
      id: tx.id,
      actor: tx.accounts,
      account: tx.contract_actions[0].contract,
      name: tx.contract_actions[0].action,
      data: tx.contract_actions[0].data,
    }));
    for (const index in blocks) {
      yield put(actionTypes.chainBlocksPush(blocks[index]));
    }
    for (const index in txs) {
      yield put(actionTypes.chainTxsPush(txs[index]));
    }
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.historyBlockFibosFailure(err));
  }
}

export function* getHistoryBlockEnumivo() {
  try {
    const stats = yield call(request, current.extend.enumivoExplorerStatsUrl);
    const blocks = stats.blocks.reverse();
    const txs = stats.transactions.reverse().map(tx => ({
      id: tx.id,
      actor: tx.accounts,
      account: tx.contract_actions[0].contract,
      name: tx.contract_actions[0].action,
      data: tx.contract_actions[0].data,
    }));
    for (const index in blocks) {
      yield put(actionTypes.chainBlocksPush(blocks[index]));
    }
    for (const index in txs) {
      yield put(actionTypes.chainTxsPush(txs[index]));
    }
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.historyBlockEnumivoFailure(err));
  }
}

export function* getChainProducers() {
  try {
    const { chainProducers } = yield select(makeSelectCurrentChain());
    const oldProducers = chainProducers.usable
      ? chainProducers.payload
      : { rows: [], more: true };
    if (oldProducers.more === false) {
      return;
    }
    const limit = 100;
    const producers = yield call(current.chain.getTableRows, {
      scope: current.extend.contractEosio,
      code: current.extend.contractEosio,
      table: 'producers',
      json: 'true',
      lower_bound: '',
      limit,
      key_type: 'float64',
      index_position: 2,
    });
    // trim bps url
    producers.rows.map((item, index) => {
      try {
        producers.rows[index].urlOrigin = new URL(item.url).origin;
      } catch (err) {
        producers.rows[index].urlOrigin = '';
      }
    });

    const newProducers = assign([], oldProducers.rows, producers.rows);
    const more =
      producers.more && newProducers.length > oldProducers.rows.length;
    // console.log(newProducers.length, oldProducers.rows.length, more)
    yield put(actionTypes.chainProducersSuccess({ rows: newProducers, more }));
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainProducersFailure(err));
  }
}

export function* getChainAccount(request) {
  try {
    const accountName = request.payload.accountName;
    const account = yield call(current.chain.getAccount, accountName);
    yield put(actionTypes.chainAccountSuccess(account));
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainAccountFailure(err));
  }
}

export function* getChainAccountFromTable(request) {
  try {
    const accountName = request.payload.accountName;
    const table = yield call(current.chain.getTableRows, {
      scope: accountName,
      code: current.extend.contractEosioToken,
      table: 'accounts',
      json: 'true',
    });
    yield put(actionTypes.chainAccountFromTableSuccess(table));
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainAccountFromTableFailure(err));
  }
}

export function* getChainAbi(request) {
  try {
    const accountName = request.payload.accountName;
    const abi = yield call(current.chain.getAbi, accountName);
    yield put(actionTypes.chainAbiSuccess(abi));
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainAbiFailure(err));
  }
}

export function* getChainRawCodeAndAbi(request) {
  try {
    const accountName = request.payload.accountName;
    const rawCodeAndAbi = yield call(
      current.chain.getRawCodeAndAbi,
      accountName,
    );
    yield put(actionTypes.chainRawCodeAndAbiSuccess(rawCodeAndAbi));
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainRawCodeAndAbiFailure(err));
  }
}

export function* getChainTransaction(request) {
  try {
    const txHash = request.payload.txHash;
    const tx = yield call(current.chain.getTransaction, txHash);

    const uniqTraces = [];
    let prevData = {};
    if (tx.traces) {
      tx.traces.map((act, key) => {
        const data = JSON.stringify([act.act]);
        if (data != prevData) {
          uniqTraces.push(act);
          prevData = data;
        }
      });
    }
    tx.traces = uniqTraces;

    yield put(actionTypes.chainTransactionSuccess(tx));
  } catch (err) {
    console.error({ err });
    yield put(actionTypes.chainTransactionFailure(err));
  }
}

export function* getChainActions(request) {
  try {
    let accountName = request.payload.accountName;
    var { chainActions } = yield select(makeSelectCurrentChain());
    var oldActions = chainActions.usable
      ? chainActions.payload
      : { actions: [], accountName: null };
    accountName = accountName || oldActions.accountName;
    const pos = oldActions.more || -1;
    const actions = yield call(current.chain.getActions, {
      account_name: accountName,
      pos,
      offset: -3,
    });
    var { chainActions } = yield select(makeSelectCurrentChain());
    var oldActions = chainActions.usable
      ? chainActions.payload
      : { actions: [], accountName: null };
    const newActions = oldActions.actions.concat(actions.actions.reverse());
    const more =
      newActions.length && newActions[newActions.length - 1].account_action_seq
        ? newActions[newActions.length - 1].account_action_seq
        : 0;
    const uniqActions = [];
    let prevData = {};
    newActions.map((act, key) => {
      const data = JSON.stringify([
        act.action_trace.trx_id,
        act.action_trace.act.data,
      ]);
      if (data != prevData) {
        uniqActions.push(act);
        prevData = data;
      }
    });

    yield put(
      actionTypes.chainActionsSuccess({
        actions: uniqActions,
        accountName,
        more,
      }),
    );
  } catch (err) {
    console.error({ err });
    var { chainActions } = yield select(makeSelectCurrentChain());
    yield put(actionTypes.chainActionsFailure(chainActions.payload));
  }
}

export default function* currentChianSaga() {
  yield takeEvery(constantsTypes.CHAIN_INFO_REQUEST, getChainInfo);
  yield takeEvery(constantsTypes.CHAIN_INFO_SUCCESS, getChianInfoBlock);
  yield takeEvery(constantsTypes.CHAIN_STATS_REQUEST, getChainStats);
  yield takeEvery(constantsTypes.CHAIN_GLOBAL_REQUEST, getChainGlobal);
  yield takeEvery(constantsTypes.CHAIN_RAMMARKET_REQUEST, getChainRammarket);
  yield takeEvery(
    constantsTypes.HISTORY_BLOCK_FIBOS_REQUEST,
    getHistoryBlockFibos,
  );
  yield takeEvery(
    constantsTypes.HISTORY_BLOCK_ENUMIVO_REQUEST,
    getHistoryBlockEnumivo,
  );
  yield takeEvery(constantsTypes.CHAIN_PRODUCERS_REQUEST, getChainProducers);
  yield takeEvery(constantsTypes.CHAIN_ACCOUNT_REQUEST, getChainAccount);
  yield takeEvery(
    constantsTypes.CHAIN_ACCOUNT_FROM_TABLE_REQUEST,
    getChainAccountFromTable,
  );
  yield takeEvery(constantsTypes.CHAIN_ABI_REQUEST, getChainAbi);
  yield takeEvery(
    constantsTypes.CHAIN_RAW_CODE_AND_ABI_REQUEST,
    getChainRawCodeAndAbi,
  );
  yield takeEvery(
    constantsTypes.CHAIN_TRANSACTION_REQUEST,
    getChainTransaction,
  );
  yield takeEvery(constantsTypes.CHAIN_ACTIONS_REQUEST, getChainActions);
  yield takeEvery(constantsTypes.CHAIN_BLOCK_REQUEST, getChianBlock);
}
