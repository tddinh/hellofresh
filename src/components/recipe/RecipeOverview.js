import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RecipeItem from './RecipeItem';
import './RecipeOverview.scss';

export default class RecipeOverview extends Component {
  constructor() {
    super();

    this.handleRecipeClicked = this.handleRecipeClicked.bind(this);
  }

  handleRecipeClicked(id, recipe) {
    this.props.handleGoToDetails(id, recipe);
  }

  renderList(items) {
    const { recipes, handleGoToDetails } = this.props;
    return (
      <div className="grid">
        {items.map(item => {
          return (
            <RecipeItem
              key={item.id}
              recipe={item}
              handleGoToDetails={this.handleRecipeClicked}/>
          );
        })}
      </div>
    );
  }

  render() {
    const {
      recipes,
      isFetching,
      errorMessage
    } = this.props;

    return (
      <div id="recipes-menu-page">
        <div className="menu-page-header page-header">
          <span className="page-title mint-underline">Our Meals</span>
          <p className="menu-page-description">These delicious dishes are available every week and we’ll continue to add more. Click any dish for more info.</p>
        </div>
        <div className="hf-wrapper padding-horizontal padding-vertical">
          <div className="section-content">
            {recipes && recipes.items ? this.renderList(recipes.items)
                                      : null}
          </div>
        </div>
        <div className="menu-page-footer padding-bottom">
          <a className="btn btn-success m-b-1">View Our Plans</a>
        </div>
      </div>
    );
  }
}

RecipeOverview.propTypes = {
  recipes: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  handleGoToDetails: PropTypes.func.isRequired
};
