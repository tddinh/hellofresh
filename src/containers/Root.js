import React, {Component} from "react";
import {Provider} from "react-redux";
import PropTypes from "prop-types";
import {Router, browserHistory} from "react-router";
import {syncHistoryWithStore} from 'react-router-redux';
import routes from "../routes";

export default class Root extends Component {

  render() {
    const { store } = this.props;
    const history = syncHistoryWithStore(browserHistory, store);

    return (
      <Provider store={store}>
        <Router history={history} routes={routes()} />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};