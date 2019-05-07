/*
 * Tx Messages
 *
 * This contains all the text for the Tx container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Tx';

export default defineMessages({
  creatDate: {
    id: `${scope}.creatDate`,
    defaultMessage: '创建时间',
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
  transactionColon: {
    id: `${scope}.transactionColon`,
    defaultMessage: '交易:',
  },
  notFoundTransaction: {
    id: `${scope}.notFoundTransaction`,
    defaultMessage: '找不到交易',
  },
  block: {
    id: `${scope}.block`,
    defaultMessage: '区块',
  },
  authorizer: {
    id: `${scope}.authorizer`,
    defaultMessage: '授权',
  },
});
