import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import RecipeOverview from '../components/recipe/RecipeOverview';
import {fetchRecipes, goToDetails} from '../actions/recipes';

class RecipePage extends Component {
  constructor() {
    super();

    this.handleGoToDetails = this.handleGoToDetails.bind(this);
  }

  componentDidMount() {
    this.props.getRecipes();
  }

  handleGoToDetails(recipeId) {
    this.props.goToDetails(recipeId);
  }

  render() {
    const {
      recipes,
      isFetching,
      errorMessage
    } = this.props;

    return (
      <RecipeOverview
        recipes={recipes}
        isFetching={isFetching}
        handleGoToDetails={this.handleGoToDetails}/>
    );
  }
}

RecipePage.propTypes = {
  recipes: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  getRecipes: PropTypes.func.isRequired,
  goToDetails: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {userInfo} = state.login;
  const {recipes, isFetching, errorMessage} = state.recipes;
  return {
    recipes,
    isFetching,
    errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipes: () => {
      dispatch(fetchRecipes());
    },
    goToDetails: (recipeId) => {
      dispatch(goToDetails(recipeId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipePage);
