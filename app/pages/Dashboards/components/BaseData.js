/**
 *
 * BaseData
 *
 */

import React from 'react';
import { Card, Grid, Header, Text } from 'tabler-react';

const BaseData = props => (
  <Card className="text-center">
    <Grid.Row>
      {props.items.map((item, index) => (
        <Grid.Col className="pt-5 pb-5" key={index}>
          <Text.Small muted>{item.header}</Text.Small>
          <Header size={3} className="mb-0">
            {item.content}{' '}
          </Header>
        </Grid.Col>
      ))}
    </Grid.Row>
  </Card>
);

BaseData.propTypes = {};

export default BaseData;
