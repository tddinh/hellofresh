import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

export default class Header extends Component {

  constructor() {
    super();

    this.goToRecipeOverviewPage = this.goToRecipeOverviewPage.bind(this);
  }

  goToRecipeOverviewPage() {
    this.props.handleNavItemClick('/recipes');
  }

  render() {

    return (
      <header id="header-main">
        <div className="header-layout layout">
          <div className="container">
            <div className="hLeft">
              {/*<a className="logo" onClick={this.goToRecipeOverviewPage}>
                <img className="logo-image"/>
              </a>*/}
              <span className="nav-list">
                <a className="nav-item" onClick={this.goToRecipeOverviewPage}>
                  <span className="nav-item--name">
                    <span className="text-uppercase">Our Meals</span>
                  </span>
                </a>
                <a className="nav-item">
                  <span className="nav-item--name">
                    <span className="text-uppercase">Our Plans</span>
                  </span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  handleNavItemClick: PropTypes.func.isRequired
};
