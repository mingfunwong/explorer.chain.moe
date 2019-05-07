/*
 * Block Messages
 *
 * This contains all the text for the Block container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Block';

export default defineMessages({
  blockColon: {
    id: `${scope}.blockColon`,
    defaultMessage: '区块:',
  },
  block: {
    id: `${scope}.block`,
    defaultMessage: '区块',
  },
  notFoundBlock: {
    id: `${scope}.notFoundBlock`,
    defaultMessage: '找不到区块',
  },
  hash: {
    id: `${scope}.hash`,
    defaultMessage: '哈希',
  },
  creatDate: {
    id: `${scope}.creatDate`,
    defaultMessage: '创建时间',
  },
  creatDateColon: {
    id: `${scope}.creatDateColon`,
    defaultMessage: '创建时间:',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: '动作',
  },
  contract: {
    id: `${scope}.contract`,
    defaultMessage: '合约',
  },
  data: {
    id: `${scope}.data`,
    defaultMessage: '数据',
  },
  transaction: {
    id: `${scope}.transaction`,
    defaultMessage: '交易',
  },
});
