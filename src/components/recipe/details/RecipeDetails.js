import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RecipeHelper from '../../../helpers/recipeHelper';
import classnames from 'classnames';
import Modal from '../../utilities/modal/Modal';
import './RecipeDetails.scss';

export default class RecipeDetails extends Component {
  constructor() {
    super();

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.state = {
      opened: false
    };
  }

  nutritionInfoList(nutrition) {
    const nutritionList = [{name: 'Nutritional Analysis', amount: '', unit: 'Per Serving'}].concat(nutrition);
    return (
      <dl className="recipe-nutrition-info">
        {nutritionList
          .reduce((acc, item, i) => {
            const dtKey = item.name + i;
            const ddKey = item.unit + i;
            const primary = i === 0 ? 'primary' : '';
            return acc.concat([
                      <dt className={`nutrition-headline ${primary}`} key={dtKey}>{item.name}</dt>,
                      <dd className={`nutrition-description ${primary}`} key={ddKey}>{`${item.amount + item.unit}`}</dd>
                    ]);
        }, [])}
      </dl>
    );
  }

  renderNutritionModal() {
    return (
      <Modal
        opened={this.state.opened}
        onRequestClose={this.handleModalClose}
        contentStyle={{ height: 'auto' }}
      >
          {this.nutritionInfoList(this.props.nutrition)}
      </Modal>
    );
  }

  handleModalOpen() {
    this.setState({ opened: true });
  }

  handleModalClose() {
    this.setState({ opened: false });
  }

  render() {
    const {
      recipeDescription,
      prepTime,
      yieldType,
      yields,
      nutrition
    } = this.props;

    return (
      <div className="recipe-details-info">
        <p>{recipeDescription}</p>
        <div className="prep-time">
          <span>
            <svg className="btn-icon" width="35" height="35" viewBox="0 0 35 35" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h35v35H0z"/><path fill="#c8c8c8" fillRule="nonzero" d="M6 9v16.286h1.846v.904h1.846v-.904h16.616v.904h1.846v-.904H30V9H6zm1.846 1.81h20.308v12.666H7.846V10.81zm1.846 1.809v9.048h12.923v-9.048H9.692zm15.693 0a.916.916 0 0 0-.923.905c0 .498.414.905.923.905a.916.916 0 0 0 .923-.905.916.916 0 0 0-.923-.905zm-13.847 1.81h9.231v5.428h-9.23V14.43zm13.847 1.81a.916.916 0 0 0-.923.904c0 .498.414.905.923.905a.916.916 0 0 0 .923-.905.916.916 0 0 0-.923-.905z"/></g></svg>
            {RecipeHelper.formatPrepTime(prepTime)}
          </span>
          <span className="serving-size">
            {RecipeHelper.getServingsize(yieldType, yields)}
          </span>
          <span className="nutrition-info">
            Nutrition Info:
              <i className="fa fa-fw fa-clone" onClick={this.handleModalOpen}/>
          </span>
        </div>
        {this.state.opened ? this.renderNutritionModal() : <span/>}
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  recipeDescription: PropTypes.string.isRequired,
  prepTime: PropTypes.string.isRequired,
  nutrition: PropTypes.array.isRequired,
  yields: PropTypes.array.isRequired,
  yieldType: PropTypes.string.isRequired
};
