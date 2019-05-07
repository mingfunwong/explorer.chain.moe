/**
 *
 * Bps
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Card, Grid, Table, Badge, Avatar } from 'tabler-react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { actionTypes, reducer } from '../../actions/currentChain';
import saga from '../../saga/currentChain';
import { makeSelectCurrentChain } from '../../selectors';
import BasicLayout from '../../layouts/BasicLayout';
import ContentPlaceholders from '../../components/ContentPlaceholders';
import chainUtil from '../../utils/blockchain/chainUtil';
import { current } from '../../utils/blockchain';
import messages from './messages';

export class Bps extends React.Component {
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
    window.scrollTo(0, 0);

    this.timer();
    this.setState({ intervalId: 0 });
    const intervalId = setInterval(this.timer.bind(this), 100);
    this.setState({ intervalId });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionTypes.chainProducersRequest());
    dispatch(actionTypes.chainGlobalRequest());
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer() {
    const { chainProducers } = this.props.currentChain;
    const { dispatch } = this.props;
    if (
      chainProducers.loading === false &&
      chainProducers.usable &&
      chainProducers.payload.more
    ) {
      dispatch(actionTypes.chainProducersRequest());
    }
  }

  render() {
    const { chainProducers, chainGlobal } = this.props.currentChain;
    const producer = chainProducers.usable ? chainProducers.payload.rows : [];
    const global = chainGlobal.usable ? chainGlobal.payload.rows[0] : {};
    const totalProducerVoteWeight = chainGlobal.usable
      ? global.total_producer_vote_weight
      : 0;

    return (
      <BasicLayout>
        <FormattedMessage {...messages.bp}>
          {msg => (
            <Helmet>
              <title>
                {current.name} {msg}
              </title>
            </Helmet>
          )}
        </FormattedMessage>
        <Grid.Row>
          <Card>
            <Card.Header>
              <Card.Title>
                <FormattedMessage {...messages.bp} />
              </Card.Title>
            </Card.Header>
            <Table cards striped responsive className="">
              <Table.Header>
                <Table.Row>
                  <Table.ColHeader>
                    <FormattedMessage {...messages.ranking} />
                  </Table.ColHeader>
                  <Table.ColHeader colSpan="2">
                    <FormattedMessage {...messages.account} />
                  </Table.ColHeader>
                  <Table.ColHeader>
                    <FormattedMessage {...messages.percent} />
                  </Table.ColHeader>
                  <Table.ColHeader>
                    <FormattedMessage {...messages.voted} />
                  </Table.ColHeader>
                  <Table.ColHeader>
                    <FormattedMessage {...messages.rewardsPerDay} />
                  </Table.ColHeader>
                  {/* <Table.ColHeader>领取收益时间</Table.ColHeader> */}
                  <Table.ColHeader>
                    <FormattedMessage {...messages.homePage} />
                  </Table.ColHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {producer.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Col>
                      <Badge color={index <= 20 ? 'primary' : 'secondary'}>
                        {index + 1}
                      </Badge>
                    </Table.Col>
                    <Table.Col>
                      <Avatar className="sm">
                        {item.owner.substr(0, 2).toUpperCase()}
                      </Avatar>
                    </Table.Col>
                    <Table.Col>
                      {/* <span className={`status-icon bg-${item.is_active ? 'success' : 'secondary'}`}></span> */}
                      <Link to={`/${current.bindPath}/account/${item.owner}`}>
                        {item.owner}
                      </Link>
                    </Table.Col>

                    <Table.Col>
                      {(
                        (item.total_votes / totalProducerVoteWeight) *
                        100
                      ).toFixed(3)}{' '}
                      %
                    </Table.Col>
                    <Table.Col>
                      {parseInt(
                        chainUtil.votesToStaked(item.total_votes),
                      ).toLocaleString()}{' '}
                      {current.symbol}
                    </Table.Col>
                    <Table.Col>
                      {parseInt(
                        chainUtil.getClaimRewards(
                          item,
                          global,
                          index + 1,
                          current,
                        ).total,
                      ).toLocaleString()}{' '}
                      {current.symbol}
                    </Table.Col>

                    {/* <Table.Col>{
                        item.last_claim_time && item.last_claim_time !== '1970-01-01T00:00:00.000'
                          ? new Date(
                            item.last_claim_time.toString().length === 16
                              ? item.last_claim_time / 1000
                              : item.last_claim_time + 'Z'
                          ).toLocaleString()
                          : '-'
                      }</Table.Col> */}
                    <Table.Col className="single-row">
                      {item.urlOrigin ? (
                        <a href={item.url} target="_blank">
                          {item.urlOrigin}
                        </a>
                      ) : (
                        '-'
                      )}
                    </Table.Col>
                  </Table.Row>
                ))}
                <ContentPlaceholders
                  loading={
                    chainProducers.usable &&
                    chainProducers.loading &&
                    chainProducers.payload.more
                  }
                  colSpan={7}
                  line={5}
                />
              </Table.Body>
            </Table>
          </Card>
        </Grid.Row>
      </BasicLayout>
    );
  }
}

Bps.propTypes = {
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
)(Bps);
