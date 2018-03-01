import { SERVER_ROOT } from '../constants/endpoints';
import { push } from "react-router-redux";
import "isomorphic-fetch";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function loginRequest(creds) {
  return {
    type: LOGIN_REQUEST,
    creds
  };
}

function loginSuccess(user, userToken) {
  return {
    type: LOGIN_SUCCESS,
    userToken,
    user
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    message
  };
}

export function loginUser(creds) {
  return performLogin(creds);
}

export function performLogin(creds) {
  let endpoint = SERVER_ROOT + '/authenticate';

  let config = {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  return (dispatch, getState) => {
    dispatch(loginRequest(creds));
    return fetch(endpoint, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          loginError('Error authenticating on api');
        } else {
          localStorage.setItem('access_token', user.access_token);
          localStorage.setItem('user_info', JSON.stringify(user.user_info));
          dispatch(loginSuccess(creds, user.access_token));
          dispatch(push('/recipes'));
        }
      }).catch(err => {
        dispatch(loginError('Internal server error on login action: ', err));
      });
  };
}


export function saveUserRatings(userInfo) {
  return localStorage.setItem('user_info', JSON.stringify(userInfo));
}

export const GET_STORED_USER_RATINGS = 'GET_STORED_USER_RATINGS';

export function getSavedUserRatings() {
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  return {
    type: GET_STORED_USER_RATINGS,
    userRatings: userInfo.recipeRatings
  };
}

export const INITIALIZE_USER_INFO_FROM_STORAGE = 'INITIALIZE_USER_INFO_FROM_STORAGE';

export function setUserInfo(stateUser) {
  let userToken = localStorage.getItem('access_token');
  let userInfo = localStorage.getItem('user_info');
  userInfo = userInfo !== null ? JSON.parse(userInfo) : stateUser;

  return {
    type: INITIALIZE_USER_INFO_FROM_STORAGE,
    userInfo,
    userToken
  };
}
