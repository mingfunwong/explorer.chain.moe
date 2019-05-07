/**
 *
 * Tx
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Page, Grid, Table, Card, Progress } from 'tabler-react';
import { Link } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import { current } from '../../utils/blockchain';
import messages from './messages';
import { actionTypes, reducer } from '../../actions/currentChain';
import { makeSelectCurrentChain } from '../../selectors';
import saga from '../../saga/currentChain';

/* eslint-disable react/prefer-stateless-function */
export class Tx extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    const { txHash } = this.props.match.params;
    this.setState({ txHash });
    dispatch(actionTypes.chainTransactionRequest({ txHash }));
  }

  render() {
    const { chainTransaction } = this.props.currentChain;
    const tx = chainTransaction.payload;
    return (
      <BasicLayout>
        <FormattedMessage {...messages.transactionColon}>
          {msg => (
            <Helmet>
              <title>
                {current.name} {msg} {this.state.txHash}
              </title>
            </Helmet>
          )}
        </FormattedMessage>
        <FormattedMessage {...messages.transaction}>
          {msg => <Page.Header title={`${current.name} ${msg}`} subTitle="" />}
        </FormattedMessage>
        {tx && !tx.id && <FormattedMessage {...messages.notFoundTransaction} />}
        {tx &&
          tx.id && (
          <React.Fragment>
            <Card>
              <Card.Header>
                <Card.Title>
                  {current.name}{' '}
                  <FormattedMessage {...messages.transactionColon} /> {tx.id}{' '}
                </Card.Title>
              </Card.Header>
              <Table cards striped responsive className="">
                <Table.Body>
                  <Table.Row>
                    <Table.ColHeader>
                      <FormattedMessage {...messages.block} />
                    </Table.ColHeader>
                    <Table.Col>
                      <strong>
                        <Link
                          to={`/${current.bindPath}/block/${tx.block_num}`}
                        >
                          {tx.block_num.toLocaleString()}
                        </Link>
                      </strong>
                    </Table.Col>
                    <Table.ColHeader>
                      <FormattedMessage {...messages.creatDate} />
                    </Table.ColHeader>
                    <Table.Col>
                      <strong>
                        {new Date(`${tx.block_time}Z`).toLocaleString()}
                      </strong>
                    </Table.Col>
                  </Table.Row>
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
                      <FormattedMessage {...messages.authorizer} />
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
                  {tx.traces.map((act, index) => (
                    <Table.Row key={index}>
                      <Table.Col>
                        {act.act.authorization &&
                          act.act.authorization.length ? (
                            <React.Fragment>
                              <Link
                                to={`/${current.bindPath}/account/${
                                  act.act.authorization[0].actor
                                }`}
                              >
                                {act.act.authorization[0].actor}
                              </Link>
                              @{act.act.authorization[0].permission}
                            </React.Fragment>
                          ) : (
                            '-'
                          )}
                      </Table.Col>
                      <Table.Col>{act.act.account}</Table.Col>
                      <Table.Col>{act.act.name}</Table.Col>
                      <Table.Col>{JSON.stringify(act.act.data)}</Table.Col>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          </React.Fragment>
        )}
      </BasicLayout>
    );
  }
}

Tx.propTypes = {
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
)(Tx);
