import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import RecipeItemDetail from '../components/recipe/details/RecipeItemDetail';
import {
  fetchRecipes,
  setRecipeDetails,
  resetRecipeDetails,
  updateRecipeFavorite,
  updateRecipeRatings
} from '../actions/recipes';

import {
  saveUserRatings,
  getSavedUserRatings
} from '../actions/login';

class RecipeDetailsPage extends Component {

  componentWillMount() {
    if (!this.props.recipes) {
      this.props.getRecipes();
    }
    else if (!this.props.recipeDetails && this.props.params) {
      this.fetchRecipeDetails(this.props.params.recipe_id);
    }
  }

  componentWillReceiveProps(props) {
    if (props.recipes && !props.recipeDetails && props.params) {
      this.fetchRecipeDetails(props.params.recipe_id);
    }
  }

  componentWillUnmount() {
    saveUserRatings(this.props.userInfo);
    this.props.resetRecipeDetails();
  }

  fetchRecipeDetails(recipeId) {
    this.props.setRecipeDetails(recipeId);
    this.props.getSavedUserRatings();
  }

  render() {
    const {
      recipeDetails,
      isFetching,
      errorMessage
    } = this.props;

    return (
      <RecipeItemDetail
        recipe={recipeDetails}
        isFetching={isFetching}
        handleRecipeFavorite={this.props.updateRecipeFavorite}
        handleRecipeRatings={this.props.updateRecipeRatings}/>
    );
  }
}

RecipeDetailsPage.propTypes = {
  userInfo: PropTypes.object,
  params: PropTypes.object,
  recipes: PropTypes.object,
  recipeDetails: PropTypes.object,
  errorMessage: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  getRecipes: PropTypes.func.isRequired,
  setRecipeDetails: PropTypes.func.isRequired,
  updateRecipeRatings: PropTypes.func.isRequired,
  updateRecipeFavorite: PropTypes.func.isRequired,
  getSavedUserRatings: PropTypes.func.isRequired,
  resetRecipeDetails: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {userInfo} = state.login;
  const {recipes, recipeDetails, isFetching, errorMessage} = state.recipes;
  return {
    recipes,
    isFetching,
    errorMessage,
    recipeDetails,
    userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipes: () => {
      dispatch(fetchRecipes());
    },
    setRecipeDetails: (recipeId) => {
      dispatch(setRecipeDetails(recipeId));
    },
    resetRecipeDetails: () => {
      dispatch(resetRecipeDetails());
    },
    updateRecipeRatings: (recipeRatings) => {
      dispatch(updateRecipeRatings(recipeRatings));
    },
    updateRecipeFavorite: (recipeRatings) => {
      dispatch(updateRecipeFavorite(recipeRatings));
    },
    getSavedUserRatings: () => {
      dispatch(getSavedUserRatings());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetailsPage);
