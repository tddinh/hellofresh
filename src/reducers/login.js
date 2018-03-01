import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  INITIALIZE_USER_INFO_FROM_STORAGE
} from '../actions/login';

import {
  UPDATE_SELECTED_RECIPE_FAVORITE,
  UPDATE_SELECTED_RECIPE_RATINGS
} from '../actions/recipes';

export default function(state = {
  userInfo: {
    email: '',
    recipeRatings: []
  },
  userToken: '',
  isAuthenticated: null,
  isFetching: false,
  errorMessage: ''
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        userToken: null
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        userToken: action.userToken,
        userInfo: action.user
      });

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });

    case INITIALIZE_USER_INFO_FROM_STORAGE:
      return Object.assign({}, state, {
        userToken: action.userToken,
        userInfo: action.userInfo,
        isAuthenticated: !!action.userToken
      });

    case UPDATE_SELECTED_RECIPE_RATINGS:
      return Object.assign({}, state, {
        userInfo: Object.assign({}, state.userInfo, {
          recipeRatings: [
            ..._filterRatingById(state.userInfo.recipeRatings, action.userRatings.id),
            action.userRatings
          ]
        })
      });

    case UPDATE_SELECTED_RECIPE_FAVORITE:
      return Object.assign({}, state, {
        userInfo: Object.assign({}, state.userInfo, {
          recipeRatings: [
            ..._filterRatingById(state.userInfo.recipeRatings, action.userRatings.id),
            action.userRatings
          ]
        })
      });

    default:
      return state;
  }
}

function _filterRatingById(collection, ratingsId) {
  if (!collection) return [];

  return collection.filter(ratings => {
    return ratings.id !== ratingsId;
  });
}
