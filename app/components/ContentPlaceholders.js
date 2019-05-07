import React from 'react';
import ContentLoader from 'react-content-loader';
import { Card, Grid, Table, Badge } from 'tabler-react';

const Loader = props => {
  const random = Math.random() * (1 - 0.7) + 0.7;
  return (
    <ContentLoader
      height={40}
      width={1060}
      speed={0.5}
      primaryColor="#d9d9d9"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="15" rx="4" ry="4" width="6" height="6.4" />
      <rect x="34" y="13" rx="6" ry="6" width={500 * random} height="12" />
      <rect x="570" y="13" rx="6" ry="6" width={150 * random} height="12" />
      <rect x="755" y="13" rx="6" ry="6" width={117 * random} height="12" />
      <rect x="938" y="13" rx="6" ry="6" width={83 * random} height="12" />
      <rect x="0" y="39" rx="6" ry="6" width="1060" height=".3" />
    </ContentLoader>
  );
};

const MyLoader = props =>
  props.loading ? (
    <Table.Row>
      <Table.Col colSpan={props.colSpan}>
        {Array(props.line)
          .fill('')
          .map((e, i) => (
            <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
          ))}
      </Table.Col>
    </Table.Row>
  ) : (
    <React.Fragment />
  );

export default MyLoader;
