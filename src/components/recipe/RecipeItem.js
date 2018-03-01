import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RecipeHelper from '../../helpers/recipeHelper';
import './RecipeItem.scss';

export default class RecipeItem extends Component {
  constructor() {
    super();

    this.handleGoToDetails = this.handleGoToDetails.bind(this);
  }

  handleGoToDetails(event) {
    event.preventDefault();
    const { recipe } = this.props;
    this.props.handleGoToDetails(recipe.id, recipe);
  }

  render() {
    const {
      recipe
    } = this.props;

    const prepTime = RecipeHelper.formatPrepTime(recipe.prepTime);

    return (
      <div className="col">
        <div className="menu-item">

          <div className="menu-item-top">
            <header className="item-top-details">
              <a className="item-top-details-clickable" href="" onClick={this.handleGoToDetails}>
                <h3 className="item-top-details-name">{recipe.name}</h3>
              </a>
            </header>
            <p className="item-top-details-description">{recipe.headline}</p>
          </div>

          <div className="menu-item-content">
            <a className="item-content-details" href="">
              <div className="content-block" title={recipe.description}>
                <img className="item-content-image" src={recipe.imageLink} alt={recipe.name} onClick={this.handleGoToDetails}/>
              </div>
            </a>
          </div>

          <div className="menu-item-bottom">
            <div className="row">
              <div className="padding-horizontal">
                <div className="">
                  <p className="oven-instruction">
                    <svg className="btn-icon" width="35" height="35" viewBox="0 0 35 35" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h35v35H0z"/><path fill="#c8c8c8" fillRule="nonzero" d="M6 9v16.286h1.846v.904h1.846v-.904h16.616v.904h1.846v-.904H30V9H6zm1.846 1.81h20.308v12.666H7.846V10.81zm1.846 1.809v9.048h12.923v-9.048H9.692zm15.693 0a.916.916 0 0 0-.923.905c0 .498.414.905.923.905a.916.916 0 0 0 .923-.905.916.916 0 0 0-.923-.905zm-13.847 1.81h9.231v5.428h-9.23V14.43zm13.847 1.81a.916.916 0 0 0-.923.904c0 .498.414.905.923.905a.916.916 0 0 0 .923-.905.916.916 0 0 0-.923-.905z"/></g></svg>
                    <span>{prepTime}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}


RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  handleGoToDetails: PropTypes.func.isRequired
};
