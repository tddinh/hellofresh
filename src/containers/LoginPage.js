import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import Login from '../components/login/Login';
import {loginUser} from '../actions/login';

class LoginPage extends Component {
  render() {
    const {
      userInfo,
      isAuthenticated,
      isFetching,
      errorMessage,
      loginUser
    } = this.props;

    return (
      <Login
        onLogin={loginUser}
        errorMessage={errorMessage}
        userInfo={userInfo}
        isFetching={isFetching}
        isAuthenticated={isAuthenticated}/>
    );
  }
}

LoginPage.propTypes = {
  userInfo: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  loginUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {userInfo, isAuthenticated, isFetching, errorMessage} = state.login;
  return {
    userInfo,
    isAuthenticated,
    isFetching,
    errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (creds) => {
      dispatch(loginUser(creds));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
