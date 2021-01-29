import React from 'react';
import { Card, Table } from 'tabler-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { current } from 'utils/blockchain';
import { FormattedMessage } from 'react-intl';
import ContentPlaceholders from '../../../components/ContentPlaceholders';
import messages from '../messages';

const LatestBlocks = props => (
  <Card>
    <Card.Header>
      <Card.Title>
        <FormattedMessage {...messages.latestBlocks} />
      </Card.Title>
    </Card.Header>
    <Table
      cards
      striped
      responsive
      className=""
      style={{ tableLayout: 'fixed', overflow: 'hidden' }}
    >
      <Table.Header>
        <Table.Row>
          <th width="25%">
            <FormattedMessage {...messages.block} />
          </th>
          <th width="10%">
            <FormattedMessage {...messages.transaction} />
          </th>
          <th width="40%">
            <FormattedMessage {...messages.date} />
          </th>
          <th width="35%">
            <FormattedMessage {...messages.producer} />
          </th>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.blocks.payload.map((block, index) => (
          <Table.Row key={index}>
            <Table.Col>
              <Link to={`/${current.bindPath}/block/${block.block_num}`}>
                {block.block_num.toLocaleString()}
              </Link>
            </Table.Col>
            <Table.Col>{block.trxCount.toLocaleString()}</Table.Col>
            <Table.Col>
              {new Date(`${block.timestamp}Z`).toLocaleString()}
            </Table.Col>
            <Table.Col>
              <Link to={`/${current.bindPath}/account/${block.producer}`}>
                {block.producer}
              </Link>
            </Table.Col>
          </Table.Row>
        ))}
        <ContentPlaceholders
          loading={!props.blocks.payload.length}
          colSpan="4"
          line={10}
        />
      </Table.Body>
    </Table>
  </Card>
);

LatestBlocks.propTypes = {
  blocks: PropTypes.shape({
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        block_num: PropTypes.number.isRequired,
        trxCount: PropTypes.number.isRequired,
        timestamp: PropTypes.string.isRequired,
        producer: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }),
};

export default LatestBlocks;
