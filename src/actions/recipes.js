import { SERVER_ROOT } from '../constants/endpoints';
import { push } from "react-router-redux";
import "isomorphic-fetch";

/* FETCH RECIPES LIST ACTION */

export const RECIPES_REQUEST = 'RECIPES_REQUEST';
export const RECIPES_SUCCESS = 'RECIPES_SUCCESS';
export const RECIPES_FAILURE = 'RECIPES_FAILURE';

function requestRecipes(data) {
  return {
    type: RECIPES_REQUEST,
    data
  };
}

function receiveRecipes(recipes) {
  return {
    type: RECIPES_SUCCESS,
    recipes
  };
}

function recipeError(message) {
  return {
    type: RECIPES_FAILURE,
    message
  };
}

export function fetchRecipes(creds) {
  return (dispatch, getState) => {
    const accessToken = getState().login.userToken || localStorage.getItem('access_token');
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ token: accessToken })
    };

    dispatch(requestRecipes());
    return fetch(SERVER_ROOT + '/recipes', config)
      .then(response =>
        response.json().then(recipes => ({ recipes, response }))
      ).then(({ recipes, response }) => {
        if (!response.ok) {
          recipeError('Error authenticating on api');
        } else {
          dispatch(receiveRecipes(recipes));
        }
      }).catch(err => {
        dispatch(recipeError('Internal server error on recipes action: ', err));
      });
  };
}

/* SELECT RECIPE ITEM ACTION */

export const SET_SELECTED_RECIPE_DETAILS = 'SET_SELECTED_RECIPE_DETAILS';
export const RESET_SELECTED_RECIPE_DETAILS = 'RESET_SELECTED_RECIPE_DETAILS';

export function setRecipeDetails(recipeId) {
  return {
    type: SET_SELECTED_RECIPE_DETAILS,
    recipeId
  };
}

export function resetRecipeDetails() {
  return {
    type: RESET_SELECTED_RECIPE_DETAILS
  };
}

export function goToDetails(recipeId) {
  return push(`/recipes/${recipeId}`);
}

/* RATE RECIPE ACTION */

export const UPDATE_SELECTED_RECIPE_FAVORITE = 'UPDATE_SELECTED_RECIPE_FAVORITE';
export const UPDATE_SELECTED_RECIPE_RATINGS = 'UPDATE_SELECTED_RECIPE_RATINGS';

export function updateRecipeFavorite(data) {
  return {
    type: UPDATE_SELECTED_RECIPE_FAVORITE,
    userRatings: data
  };
}

export function updateRecipeRatings(data) {
  return {
    type: UPDATE_SELECTED_RECIPE_RATINGS,
    userRatings: data
  };
}
