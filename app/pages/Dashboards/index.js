/**
 *
 * Dashboards
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Badge, Page } from 'tabler-react';
import { current } from 'utils/blockchain';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { actionTypes, reducer } from '../../actions/currentChain';
import saga from '../../saga/currentChain';
import { makeSelectCurrentChain } from '../../selectors';
import BaseData from './components/BaseData';
import ExtendDataFibos from './components/ExtendDataFibos';
import LatestFlow from './components/LatestFlow';
import BasicLayout from '../../layouts/BasicLayout';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Dashboards extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionTypes.chainRammarketRequest());
    dispatch(actionTypes.chainGlobalRequest());
    current.name === 'FIBOS' &&
      dispatch(actionTypes.historyBlockFibosRequest());
    current.name === 'Enumivo' &&
      dispatch(actionTypes.historyBlockEnumivoRequest());

    this.timer();
    this.setState({ intervalId: 0 });
    const intervalId = setInterval(this.timer.bind(this), 500);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    this.state && clearInterval(this.state.intervalId);
  }

  timer() {
    const { dispatch } = this.props;
    dispatch(actionTypes.chainInfoRequest());
  }

  render() {
    const {
      chainInfo,
      chainRammarket,
      chainGlobal,
      chainInfoBlock,
      chainBlocks,
      chainTxs,
    } = this.props.currentChain;
    const baseDataItems = [
      {
        header: <FormattedMessage {...messages.latestBlocks} />,
        content: chainInfo.usable
          ? chainInfo.payload.head_block_num.toLocaleString()
          : 0,
      },
      {
        header: <FormattedMessage {...messages.irreversibleBlocks} />,
        content: chainInfo.usable
          ? chainInfo.payload.last_irreversible_block_num.toLocaleString()
          : 0,
      },
      {
        header: <FormattedMessage {...messages.producer} />,
        content: chainInfo.usable
          ? chainInfo.payload.head_block_producer.toLocaleString()
          : '-',
      },
      {
        header: <FormattedMessage {...messages.ramPrice} />,
        content: `${
          chainRammarket.usable ? chainRammarket.payload.mbPrice.toFixed(2) : 0
        } ${current.symbol} / MB`,
      },
      {
        header: <FormattedMessage {...messages.ramUsed} />,
        content: `${
          chainGlobal.usable ? chainGlobal.payload.ramPercent : 0
        } GB`,
      },
    ];

    return (
      <BasicLayout>
        <FormattedMessage {...messages.blockchainExplorer}>
          {msg => (
            <Helmet>
              <title>
                CM - {current.name} {msg}
              </title>
            </Helmet>
          )}
        </FormattedMessage>
        <FormattedMessage {...messages.dashboards}>
          {msg => (
            <Page.Header
              title={msg}
              subTitle=""
              children={
                <Badge color="primary" className="ml-2">
                  {current.name}
                </Badge>
              }
            />
          )}
        </FormattedMessage>
        <BaseData items={baseDataItems} />
        {/* {current.name === 'FIBOS' ? <ExtendDataFibos /> : <React.Fragment />} */}
        <LatestFlow
          block={chainInfoBlock}
          txs={chainTxs}
          blocks={chainBlocks}
        />
      </BasicLayout>
    );
  }
}

Dashboards.propTypes = {
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
)(Dashboards);
