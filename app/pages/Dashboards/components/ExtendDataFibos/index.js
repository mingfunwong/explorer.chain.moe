/**
 *
 * ExtendDataFibos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Grid, StampCard } from 'tabler-react';
import { eos, current } from 'utils/blockchain';
import { makeSelectFibosChain } from '../../../../selectors';
import { reducer, actionTypes } from '../../../../actions/fibosChain';
import saga from '../../../../saga/fibosChain';

/* eslint-disable react/prefer-stateless-function */
export class ExtendDataFibos extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionTypes.foEosPercentRequest());
    dispatch(actionTypes.foMarketValueRequest());
    dispatch(actionTypes.eosBananceRequest());
  }

  render() {
    const { foEosPercent, eosBanance, foMarketValue } = this.props.fibosChain;

    const items = [
      {
        color: 'blue',
        icon: 'percent',
        content: foEosPercent.usable
          ? foEosPercent.payload.toFixed(4).toLocaleString()
          : 0,
        unit: `${current.symbol} / ${eos.symbol}`,
        footer: '兑换比率',
      },
      {
        color: 'teal',
        icon: 'dollar-sign',
        content: foMarketValue.usable
          ? parseInt(foMarketValue.payload).toLocaleString()
          : 0,
        unit: 'USD',
        footer: `${current.symbol} 市值`,
      },
      {
        color: 'orange',
        icon: ' fa fa-piggy-bank',
        content: eosBanance.usable
          ? parseInt(eosBanance.payload.core_liquid_balance).toLocaleString()
          : 0,
        unit: eos.symbol,
        footer: '跨链账户余额',
      },
    ];

    return (
      <Grid.Row>
        {items.map((item, index) => (
          <Grid.Col key={index}>
            <StampCard
              color={item.color}
              icon={item.icon}
              header={
                <div>
                  {item.content}
                  <small> {item.unit} </small>
                </div>
              }
              footer={item.footer}
            />
          </Grid.Col>
        ))}
      </Grid.Row>
    );
  }
}

ExtendDataFibos.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fibosChain: makeSelectFibosChain(),
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

const withReducer = injectReducer({ key: 'fibosChain', reducer });
const withSaga = injectSaga({ key: 'fibosChain', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExtendDataFibos);
