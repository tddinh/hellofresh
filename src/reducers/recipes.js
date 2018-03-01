import {
  RECIPES_REQUEST,
  RECIPES_SUCCESS,
  RECIPES_FAILURE,
  SET_SELECTED_RECIPE_DETAILS,
  RESET_SELECTED_RECIPE_DETAILS,
  UPDATE_SELECTED_RECIPE_RATINGS,
  UPDATE_SELECTED_RECIPE_FAVORITE
} from '../actions/recipes';

import {
  GET_STORED_USER_RATINGS
} from '../actions/login';

export default function(state = {
  recipes: null,
  isFetching: false,
  errorMessage: '',
  recipeDetails: null
}, action) {
  switch (action.type) {
    case RECIPES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECIPES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        recipes: action.recipes
      });

    case RECIPES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });

    case SET_SELECTED_RECIPE_DETAILS:
      return Object.assign({}, state, {
        recipeDetails: _findRecipe(action.recipeId, state.recipes.items)
      });

    case RESET_SELECTED_RECIPE_DETAILS:
      return Object.assign({}, state, {
        recipeDetails: null
      });

    case UPDATE_SELECTED_RECIPE_FAVORITE:
      return Object.assign({}, state, {
        recipeDetails: Object.assign({}, state.recipeDetails, {
          userRatings: action.userRatings
        })
      });

    case UPDATE_SELECTED_RECIPE_RATINGS:
      return Object.assign({}, state, {
        recipeDetails: Object.assign({}, state.recipeDetails, {
          userRatings: action.userRatings
        })
      });

    case GET_STORED_USER_RATINGS:
      return Object.assign({}, state, {
        recipeDetails: Object.assign({}, state.recipeDetails, {
          userRatings: _findRecipe(state.recipeDetails.id, action.userRatings)
        })
      });

    default:
      return state;
  }
}

function _findRecipe(id, collection) {
  return collection
    ? collection.filter(obj => obj.id === id)[0]
    : null;
}
