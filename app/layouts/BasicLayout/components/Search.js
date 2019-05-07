/**
 *
 * Search
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Grid, Form, Button } from 'tabler-react';
import { FormattedMessage } from 'react-intl';
import { current } from '../../../utils/blockchain';
import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const value = this.state.value;
    if (!value) return;
    // block
    if (/^[0-9]*$/.test(value)) {
      return (window.location.href = `/${current.bindPath}/block/${value}`);
    }
    // tx
    if (/^[0-9a-z]{64}$/.test(value)) {
      return (window.location.href = `/${current.bindPath}/tx/${value}`);
    }
    // account
    if (/^[0-9a-z]{1,12}$/.test(value)) {
      return (window.location.href = `/${current.bindPath}/account/${value}`);
    }
  }

  render() {
    return (
      <div>
        <Grid.Row>
          <Grid.Col>
            <form onSubmit={this.handleSubmit}>
              <Form.InputGroup>
                <FormattedMessage {...messages.searchKey}>
                  {msg => (
                    <input
                      className="form-control"
                      type="text"
                      placeholder={msg}
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  )}
                </FormattedMessage>
                <Form.InputGroupAppend>
                  <Button
                    RootComponent="button"
                    color="primary"
                    onClick={this.handleSubmit}
                  >
                    <FormattedMessage {...messages.search} />
                  </Button>
                </Form.InputGroupAppend>
              </Form.InputGroup>
            </form>
          </Grid.Col>
        </Grid.Row>
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Search);
