/*
 * Account Messages
 *
 * This contains all the text for the Account container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Account';

export default defineMessages({
  accountColon: {
    id: `${scope}.accountColon`,
    defaultMessage: '账号:',
  },
  account: {
    id: `${scope}.account`,
    defaultMessage: '账号',
  },
  notFoundAccont: {
    id: `${scope}.notFoundAccont`,
    defaultMessage: '找不到账号',
  },
  creatDateColon: {
    id: `${scope}.creatDateColon`,
    defaultMessage: '创建时间:',
  },
  balance: {
    id: `${scope}.balance`,
    defaultMessage: '余额',
  },
  ram: {
    id: `${scope}.ram`,
    defaultMessage: 'RAM 内存',
  },
  cpu: {
    id: `${scope}.cpu`,
    defaultMessage: 'CPU 抵押',
  },
  net: {
    id: `${scope}.net`,
    defaultMessage: 'NET 抵押',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: '动作',
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: '时间',
  },
  transaction: {
    id: `${scope}.transaction`,
    defaultMessage: '交易',
  },
  block: {
    id: `${scope}.block`,
    defaultMessage: '区块',
  },
  contract: {
    id: `${scope}.contract`,
    defaultMessage: '合约',
  },
  data: {
    id: `${scope}.data`,
    defaultMessage: '数据',
  },
});
