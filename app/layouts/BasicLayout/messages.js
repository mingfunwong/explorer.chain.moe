/*
 * BasicLayout Messages
 *
 * This contains all the text for the BasicLayout container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BasicLayout';

export default defineMessages({
  dashboards: {
    id: `${scope}.dashboards`,
    defaultMessage: '仪表盘',
  },
  bp: {
    id: `${scope}.bp`,
    defaultMessage: '超级节点',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: '搜索',
  },
  searchKey: {
    id: `${scope}.searchKey`,
    defaultMessage: '账户 / 区块 / 交易',
  },
});
