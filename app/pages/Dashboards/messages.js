/*
 * Dashboards Messages
 *
 * This contains all the text for the Dashboards container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Dashboards';

export default defineMessages({
  blockchainExplorer: {
    id: `${scope}.blockchainExplorer`,
    defaultMessage: '区块链浏览器',
  },
  dashboards: {
    id: `${scope}.dashboards`,
    defaultMessage: '仪表盘',
  },
  latestBlocks: {
    id: `${scope}.latestBlocks`,
    defaultMessage: '最新区块',
  },
  irreversibleBlocks: {
    id: `${scope}.irreversibleBlocks`,
    defaultMessage: '不可逆区块',
  },
  producer: {
    id: `${scope}.producer`,
    defaultMessage: '出块节点',
  },
  ramPrice: {
    id: `${scope}.ramPrice`,
    defaultMessage: '内存价格',
  },
  ramUsed: {
    id: `${scope}.ramUsed`,
    defaultMessage: '内存占用',
  },
  block: {
    id: `${scope}.block`,
    defaultMessage: '区块',
  },
  transaction: {
    id: `${scope}.transaction`,
    defaultMessage: '交易',
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: '时间',
  },
  account: {
    id: `${scope}.account`,
    defaultMessage: '账号',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: '动作',
  },
  hash: {
    id: `${scope}.hash`,
    defaultMessage: '哈希',
  },
  latestTransaction: {
    id: `${scope}.latestTransaction`,
    defaultMessage: '最新交易',
  },
});
