/**
 *
 * LatestFlow
 *
 */

import React from 'react';
import { Grid } from 'tabler-react';
import LatestBlocks from './LatestBlocks';
import LatestTxs from './LatestTxs';

const LatestFlow = props => (
  <Grid.Row>
    <Grid.Col xs={12} lg={6} ignoreCol>
      <LatestBlocks block={props.block} blocks={props.blocks} line={10} />
    </Grid.Col>
    <Grid.Col xs={12} lg={6} ignoreCol>
      <LatestTxs block={props.block} txs={props.txs} line={10} />
    </Grid.Col>
  </Grid.Row>
);

LatestFlow.propTypes = {};

export default LatestFlow;
