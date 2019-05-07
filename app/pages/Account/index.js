/**
 *
 * Account
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Page, Grid, Table, Card, Progress } from 'tabler-react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { assign, merge } from 'lodash/object';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { actionTypes, reducer } from '../../actions/currentChain';
import BasicLayout from '../../layouts/BasicLayout';
import saga from '../../saga/currentChain';
import { makeSelectCurrentChain } from '../../selectors';
import { current } from '../../utils/blockchain';
import ContentPlaceholders from '../../components/ContentPlaceholders';
import messages from './messages';

export class Account extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    const accountName = this.props.match.params.accountName;
    this.setState({ accountName });
    dispatch(actionTypes.chainAccountRequest({ accountName }));
    dispatch(actionTypes.chainAccountFromTableRequest({ accountName }));
    dispatch(actionTypes.chainAbiRequest({ accountName }));
    dispatch(
      actionTypes.chainActionsSuccess({ actions: [], accountName: null }),
    );
    dispatch(actionTypes.chainActionsRequest({ accountName }));

    this.timer();
    this.setState({ intervalId: 0 });
    const intervalId = setInterval(this.timer.bind(this), 100);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer() {
    const { chainActions } = this.props.currentChain;
    const accountName = this.props.match.params.accountName;
    const { dispatch } = this.props;
    if (
      document.documentElement.scrollTop + window.outerHeight * 2 >
        document.documentElement.scrollHeight &&
      chainActions.loading === false &&
      chainActions.usable &&
      chainActions.payload.more
    ) {
      dispatch(actionTypes.chainActionsRequest({ accountName }));
    }
  }

  render() {
    const {
      chainAccount,
      chainActions,
      chainAccountFromTable,
    } = this.props.currentChain;
    const account = merge(
      {
        total_resources: { cpu_weight: 0, net_weight: 0 },
        cpu_limit: { used: 0, max: 0 },
        net_limit: { used: 0, max: 0 },
        ram_quota: 0,
        ram_usage: 0,
      },
      chainAccount.payload,
    );
    const actions = chainActions.payload ? chainActions.payload.actions : [];
    let liquid_balance =
      account.core_liquid_balance || `0.0000 ${current.symbol}`;
    if (current.name.substr(0, 5) === 'FIBOS' && chainAccountFromTable.usable) {
      chainAccountFromTable.payload.rows.map(item => {
        if (
          item.balance.contract === current.extend.contractEosio &&
          item.balance.quantity.substr(-2) === current.symbol
        ) {
          liquid_balance = item.balance.quantity;
        }
      });
    }
    return (
      <BasicLayout>
        <FormattedMessage {...messages.accountColon}>
          {msg => (
            <Helmet>
              <title>
                {current.name} {msg} {this.state.accountName}
              </title>
            </Helmet>
          )}
        </FormattedMessage>
        <FormattedMessage {...messages.account}>
          {msg => <Page.Header title={`${current.name} ${msg}`} subTitle="" />}
        </FormattedMessage>
        <Grid.Row>
          {account.status == 500 ? (
            <FormattedMessage {...messages.notFoundAccont} />
          ) : (
            <React.Fragment>
              <Card>
                <Card.Header>
                  <Card.Title>{account.account_name} </Card.Title>
                  <small className="text-muted pl-2">
                    <FormattedMessage {...messages.creatDateColon} />{' '}
                    {new Date(`${account.created}Z`).toLocaleString()}
                  </small>
                </Card.Header>
                <Table cards striped responsive className="">
                  <Table.Body>
                    <Table.Row>
                      <Table.ColHeader>
                        <FormattedMessage {...messages.balance} />
                      </Table.ColHeader>
                      <Table.Col>
                        <strong>{liquid_balance}</strong>
                      </Table.Col>
                      <Table.ColHeader>
                        <FormattedMessage {...messages.ram} />
                      </Table.ColHeader>
                      <Table.Col>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>
                              {(account.ram_usage / 1000).toLocaleString()} K /{' '}
                              {(account.ram_quota / 1000).toLocaleString()} K
                            </strong>
                          </div>
                          <div className="float-right">
                            <small className="sm text-muted" />
                          </div>
                        </div>
                        <Progress size="xs">
                          <Progress.Bar
                            width={
                              (account.ram_usage / account.ram_quota) * 100
                            }
                          />
                        </Progress>
                      </Table.Col>
                    </Table.Row>
                    <Table.Row>
                      <Table.ColHeader>
                        <FormattedMessage {...messages.cpu} />
                      </Table.ColHeader>
                      <Table.Col>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>
                              {account.total_resources &&
                                account.total_resources.cpu_weight}
                            </strong>
                          </div>
                          <div className="float-right">
                            <small className="sm text-muted">
                              {(account.cpu_limit.used / 1000).toLocaleString()}{' '}
                              ms /{' '}
                              {(account.cpu_limit.max / 1000).toLocaleString()}{' '}
                              ms
                            </small>
                          </div>
                        </div>
                        <Progress size="xs">
                          <Progress.Bar
                            width={
                              (account.cpu_limit.used / account.cpu_limit.max) *
                              100
                            }
                          />
                        </Progress>
                      </Table.Col>
                      <Table.ColHeader>
                        <FormattedMessage {...messages.net} />
                      </Table.ColHeader>
                      <Table.Col>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>
                              {account.total_resources &&
                                account.total_resources.net_weight}
                            </strong>
                          </div>
                          <div className="float-right">
                            <small className="sm text-muted">
                              {(account.net_limit.used / 1000).toLocaleString()}{' '}
                              ms /{' '}
                              {(account.net_limit.max / 1000).toLocaleString()}{' '}
                              ms
                            </small>
                          </div>
                        </div>
                        <Progress size="xs">
                          <Progress.Bar
                            width={
                              (account.net_limit.used / account.net_limit.max) *
                              100
                            }
                          />
                        </Progress>
                      </Table.Col>
                    </Table.Row>
                    <ContentPlaceholders
                      loading={chainAccount.loading}
                      colSpan={2}
                      line={1}
                    />
                  </Table.Body>
                </Table>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>
                    <FormattedMessage {...messages.actions} />
                  </Card.Title>
                </Card.Header>
                <Table
                  cards
                  striped
                  responsive
                  className=""
                  style={{ tableLayout: 'fixed' }}
                >
                  <Table.Header>
                    <Table.Row>
                      <th width="12%">
                        <FormattedMessage {...messages.date} />
                      </th>
                      <th width="8%">
                        <FormattedMessage {...messages.transaction} />
                      </th>
                      <th width="10%">
                        <FormattedMessage {...messages.block} />
                      </th>
                      <th width="12%">
                        <FormattedMessage {...messages.contract} />
                      </th>
                      <th width="10%">
                        <FormattedMessage {...messages.actions} />
                      </th>
                      <th width="">
                        <FormattedMessage {...messages.data} />
                      </th>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {actions.map((act, index) => (
                      <Table.Row key={index}>
                        <Table.Col>
                          {new Date(
                            `${act.action_trace.block_time}Z`,
                          ).toLocaleString()}
                        </Table.Col>
                        <Table.Col>
                          <Link
                            to={`/${current.bindPath}/tx/${
                              act.action_trace.trx_id
                            }`}
                          >
                            {act.action_trace.trx_id.substr(0, 4)}
                            ...
                          </Link>
                        </Table.Col>
                        <Table.Col>
                          <Link
                            to={`/${current.bindPath}/block/${
                              act.action_trace.block_num
                            }`}
                          >
                            {act.action_trace.block_num.toLocaleString()}
                          </Link>
                        </Table.Col>
                        <Table.Col>{act.action_trace.act.account}</Table.Col>
                        <Table.Col>{act.action_trace.act.name}</Table.Col>
                        <Table.Col>
                          {JSON.stringify(act.action_trace.act.data)}
                        </Table.Col>
                      </Table.Row>
                    ))}
                    <ContentPlaceholders
                      loading={
                        chainActions.usable &&
                        (chainActions.loading || chainActions.payload.more)
                      }
                      colSpan={6}
                      line={2}
                    />
                  </Table.Body>
                </Table>
              </Card>
            </React.Fragment>
          )}
        </Grid.Row>
      </BasicLayout>
    );
  }
}

Account.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  currentChain: makeSelectCurrentChain(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'currentChain', reducer });
const withSaga = injectSaga({ key: 'currentChain', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Account);
