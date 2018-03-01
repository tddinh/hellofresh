import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RecipeHelper from '../../../helpers/recipeHelper';
import './RecipeIngredients.scss';

export default class RecipeIngredients extends Component {

  getIngredientMeasurements(ingredient) {
    return RecipeHelper.getIngredientMeasurements(ingredient, this.props.yields);
  }

  render() {
    const {
      ingredients,
      allergens,
      yields
    } = this.props;

    return (
      <div className="recipe-ingredients-info">
        <div className="ingredients-list">
          {ingredients.map(ingredient => {
            return (
              <div className="ingredient-item" key={ingredient.id}>
                <img className="ingredient-item--image" src={ingredient.imageLink} title={this.getIngredientMeasurements(ingredient)}/>
                <p className="ingredient-item--type">{ingredient.type}</p>
              </div>
            );
          })}
        </div>
        <div className="allergens-list">
          <span className="allergens-label">Allergens:</span>
          <div className="allergens-item--container">
              {allergens.map(allergen => {
                return (
                  <div className="allergen-item" key={allergen.id}>
                    <img className="allergen-item--image" src={allergen.iconLink}/>
                    <span className="allergen-item--type">{allergen.name}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

RecipeIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
  allergens: PropTypes.array.isRequired,
  yields: PropTypes.array.isRequired
};
