/*
 * Bps Messages
 *
 * This contains all the text for the Bps container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Bps';

export default defineMessages({
  bp: {
    id: `${scope}.bp`,
    defaultMessage: '超级节点',
  },
  ranking: {
    id: `${scope}.ranking`,
    defaultMessage: '排名',
  },
  account: {
    id: `${scope}.account`,
    defaultMessage: '节点账号',
  },
  percent: {
    id: `${scope}.percent`,
    defaultMessage: '投票率',
  },
  voted: {
    id: `${scope}.voted`,
    defaultMessage: '估算票数',
  },
  rewardsPerDay: {
    id: `${scope}.rewardsPerDay`,
    defaultMessage: '估算每日收益',
  },
  homePage: {
    id: `${scope}.homePage`,
    defaultMessage: '网址',
  },
});
