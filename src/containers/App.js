import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { push } from "react-router-redux";
import {
  setUserInfo
} from '../actions/login';

class App extends Component {

  componentWillMount() {
    if (!this.props.userToken) {
      this.props.setUserInfo(this.props.userInfo);
    }
  }

  componentDidUpdate() {
    if (!this.props.userToken && !this.props.isAuthenticated) {
      this.handleRedirect();
    }
  }

  handleRedirect() {
    if (location.pathname !== '/' && location.pathname !== '/login') {
      this.props.redirectToLogin();
    }
  }

  render() {
    const { children, hideFooter } = this.props;

    return (
      <div id="page" className="wrapper">
        <div id="header-particle">
          <Header
            handleNavItemClick={this.props.onNavigationItemClickEvent}/>
        </div>
        <div id="content" role="main">
          {children}
        </div>
        <div id="footer-particle">
          <Footer hideFooter={hideFooter}/>
        </div>
      </div>
		);
	}
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  userToken: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  setUserInfo: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  onNavigationItemClickEvent: PropTypes.func.isRequired,
  hideFooter: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { userInfo, userToken, isAuthenticated, isFetching } = state.login;
  const { recipes, recipeDetails } = state.recipes;
  const hideFooter = (state.login.isFetching || state.recipes.isFetching || (!recipes && !recipeDetails));
  return {
    userInfo,
    userToken,
    isAuthenticated,
    hideFooter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onNavigationItemClickEvent: (endpoint) => {
      dispatch(push(endpoint));
    },
    setUserInfo: () => {
      dispatch(setUserInfo());
    },
    redirectToLogin: () => {
      dispatch(push('/'));
    }
  };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
