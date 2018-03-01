import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RecipeHelper from '../../../helpers/recipeHelper';
import './RecipeSteps.scss';

export default class RecipeSteps extends Component {

  getUtensilById(utensilId, utensils) {
    return RecipeHelper.getUtensilById(utensilId, utensils);
  }

  render() {
    const {
      step,
      utensils
    } = this.props;

    return (
      <div className="instruction-steps">
        <div className="instruction-steps-image">
          <img src={step.images[0].link}/>
        </div>
        <div className="instruction-steps-content">
          <div className="content-header">
            <span className="steps-number">{step.index}</span>
            <span className="steps-title">{step.images[0].caption}</span>
          </div>
          <div className="steps-text">
            <p>{step.instructions}</p>
          </div>
          <div className="steps-utensils">
            {/*step.utensils.map(id => {
              const utensil = this.getUtensilById(id, utensils);
              if (utensil) {
                return (<span>{utensil.name}</span>);
              } else {
                return null;
              }
            })*/}
          </div>
        </div>
      </div>
    );
  }
}

RecipeSteps.propTypes = {
  step: PropTypes.object.isRequired,
  utensils: PropTypes.array.isRequired
};
