import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

export default class Footer extends Component {

  render() {
    const { hideFooter } = this.props;

    return (
      <footer id="footer" className={hideFooter ? 'hide-footer' : ''}>
        <div className="container"/>
      </footer>
    );
  }
}

Footer.propTypes = {
  hideFooter: PropTypes.bool.isRequired
};
