import React, {Component} from "react";
import PropTypes from 'prop-types';
import './Spinner.scss';

class Spinner extends Component {
  renderDots(i) {
    return (
      <div key={i} className={`dot-${i}`} />
    );
  }

  render() {
    return (
        <div className="dots">
          {new Array(this.props.size)
            .fill('').map((val, i) => this.renderDots(i))
          }
        </div>
    );
  }
}

Spinner.defaultProps = {
  size: 8
};

Spinner.propTypes = {
  size: PropTypes.number.isRequired
};


export default Spinner;
