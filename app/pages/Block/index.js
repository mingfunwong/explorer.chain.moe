/**
 *
 * Block
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
export class Block extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    const { blockNumber } = this.props.match.params;
    this.setState({ blockNumber });
    dispatch(actionTypes.chainBlockRequest({ blockNumber }));
  }

  render() {
    const { chainBlock } = this.props.currentChain;
    const block = chainBlock.payload;
    const transactions = [];
    if (block && block.transactions) {
      block.transactions.map((act, key) => {
        if (
          act.trx &&
          act.trx.transaction &&
          act.trx.transaction.actions &&
          act.trx.transaction.actions.length
        ) {
          transactions.push(act);
        }
      });
    }

    return (
      <BasicLayout>
        <FormattedMessage {...messages.blockColon}>
          {msg => (
            <Helmet>
              <title>
                {current.name} {msg} {this.state.blockNumber}
              </title>
            </Helmet>
          )}
        </FormattedMessage>
        <FormattedMessage {...messages.block}>
          {msg => <Page.Header title={`${current.name} ${msg}`} subTitle="" />}
        </FormattedMessage>
        {block && !block.id && <FormattedMessage {...messages.notFoundBlock} />}
        {block &&
          block.id && (
            <React.Fragment>
              <Card>
                <Card.Header>
                  <Card.Title>
                    {current.name} <FormattedMessage {...messages.blockColon} />{' '}
                    {block.block_num.toLocaleString()}{' '}
                  </Card.Title>
                </Card.Header>
                <Table cards striped responsive className="">
                  <Table.Body>
                    <Table.Row>
                      <Table.ColHeader>
                        <FormattedMessage {...messages.hash} />
                      </Table.ColHeader>
                      <Table.Col>{block.id}</Table.Col>
                      <Table.ColHeader>
                        <FormattedMessage {...messages.creatDate} />
                      </Table.ColHeader>
                      <Table.Col>
                        <strong>
                          {new Date(`${block.timestamp}Z`).toLocaleString()}
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
                      <th width="8%">
                        <FormattedMessage {...messages.transaction} />
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
                    {transactions.map((act, index) => (
                      <Table.Row key={index}>
                        <Table.Col>
                          <Link to={`/${current.bindPath}/tx/${act.trx.id}`}>
                            {act.trx.id.substr(0, 4)}
                          </Link>
                        </Table.Col>
                        <Table.Col>
                          {act.trx.transaction.actions[0].account}
                        </Table.Col>
                        <Table.Col>
                          {act.trx.transaction.actions[0].name}
                        </Table.Col>
                        <Table.Col>
                          {JSON.stringify(act.trx.transaction.actions[0].data)}
                        </Table.Col>
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

Block.propTypes = {
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
)(Block);
