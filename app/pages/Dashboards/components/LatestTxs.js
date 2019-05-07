import React from 'react';
import { Card, Table, Badge } from 'tabler-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { current } from 'utils/blockchain';
import { FormattedMessage } from 'react-intl';
import ContentPlaceholders from '../../../components/ContentPlaceholders';
import messages from '../messages';

const LatestTxs = props => (
  <Card>
    <Card.Header>
      <Card.Title>
        <FormattedMessage {...messages.latestTransaction} />
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
          <th width="100">
            <FormattedMessage {...messages.hash} />
          </th>
          <th width="25%">
            <FormattedMessage {...messages.account} />
          </th>
          <th width="20%">
            <FormattedMessage {...messages.actions} />
          </th>
          <th />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.txs.payload.map((act, index) => (
          <Table.Row key={index}>
            <Table.Col>
              <Link to={`/${current.bindPath}/tx/${act.id}`}>
                {act.id.substr(0, 4)}
                ...
              </Link>
            </Table.Col>
            <Table.Col>
              <Link to={`/${current.bindPath}/account/${act.actor[0]}`}>
                {act.actor[0]}
              </Link>
            </Table.Col>
            <Table.Col>
              <Badge color="primary">{act.name}</Badge>
            </Table.Col>
            <Table.Col className="single-row">
              {' '}
              {act.data.name} {act.data.receiver} {act.data.to}{' '}
              {act.data.proposal_name}{' '}
              <span className="text-muted">
                {act.data.quant}{' '}
                {act.data.quantity
                  ? act.data.quantity.quantity
                    ? act.data.quantity.quantity
                    : act.data.quantity
                  : ''}
              </span>
            </Table.Col>
          </Table.Row>
        ))}
        <ContentPlaceholders
          loading={!props.txs.payload.length}
          colSpan="4"
          line={10}
        />
      </Table.Body>
    </Table>
  </Card>
);

LatestTxs.propTypes = {
  blocks: PropTypes.shape({
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        actor: PropTypes.arrayOf(PropTypes.string).isRequired,
        account: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
      }),
    ).isRequired,
  }),
};

export default LatestTxs;
