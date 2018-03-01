import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import _ from 'lodash';

export default class Login extends Component {
  constructor() {
    super();

    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleForgotPasswordClick = this.handleForgotPasswordClick.bind(this);
    this.state = {
      email: '',
      password: '',
      errors: null
    };
  }

  handleInputChange(event) {
    const { type, value } = event.target;
    const newState = {};
    newState[type] = value;
    this.setState(newState);
  }

  handleLoginUser(event) {
    event.preventDefault();

    const { email, password } = this.state;

    const errors = validateLogin({email, password});
    if (_.isEmpty(errors)) {
      this.props.onLogin({email});
    }

    this.setState({ errors: errors });
  }

  handleForgotPasswordClick(event) {
    window.alert('any password works!');
  }

  render() {
    const { errors } = this.state;
    const {
      userInfo,
      isAuthenticated,
      isFetching,
      errorMessage
    } = this.props;

    return (
      <div id="hf-login">
        <section className="container card">
          <form className="login-form" role="form">
            <div className="row">
              <div className="text-center form-group">
                <h2 className="header">Log <span className="mint-underline">In</span></h2>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <fieldset className="form-group form-group-md">
                  <label className="control-label" htmlFor="email">Email</label>
                  <small className="dummy-space small-val">&nbsp;</small>
                  <input
                    id="email-input"
                    type="email"
                    className="form-control"
                    required="required"
                    onChange={this.handleInputChange}/>
                  {errors && errors.email
                    ? <small className="text-danger small-val">{errors.email}</small>
                    : null}
                </fieldset>
                <fieldset className="form-group form-group-md">
                  <label className="control-label" htmlFor="password">Password</label>
                  <small className="dummy-space small-val">&nbsp;</small>
                  <input
                    id="password-input"
                    type="password"
                    className="form-control"
                    required="required"
                    onChange={this.handleInputChange}/>
                  {errors && errors.password
                    ? <small className="text-danger small-val">{errors.password}</small>
                    : null}
                </fieldset>
                <p id="forgot-password-button">
                  <a onClick={this.handleForgotPasswordClick}>
                    <b>Forgot Password?</b>
                  </a>
                </p>
              </div>
              <div className="col-xs-12 btn-container">
                <input
                  id="submit-login-button"
                  className="btn btn-success btn-block m-b-1"
                  value={isFetching ? "Logging in" : "Log In"}
                  type="submit"
                  onClick={this.handleLoginUser} />
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

function validateLogin(data) {
  const errors = {};
  const emailMatcher = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!data.email) {
    errors.email = 'Email is required';
  }
  else if (!emailMatcher.test(data.email)) {
    errors.email = 'Invalid email';
  }

  if (!data.password.length) {
    errors.password = 'Password is required';
  }
  else if (data.password.length < 6) {
    errors.password = 'Password must be six characters or more';
  }

  return errors;
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};
