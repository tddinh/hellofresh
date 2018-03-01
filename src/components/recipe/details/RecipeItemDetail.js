import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from "classnames";
import RecipeSteps from './RecipeSteps';
import RecipeDetails from './RecipeDetails';
import RecipeIngredients from './RecipeIngredients';
import Modal from '../../utilities/modal/Modal';
import Spinner from '../../utilities/spinner/Spinner';
import './RecipeItemDetail.scss';

const TAB_OPTIONS = ['details', 'ingredients'];

export default class RecipeItemDetail extends Component {
  constructor() {
    super();

    this.handleSelectTab = this.handleSelectTab.bind(this);
    this.handleSelectStep = this.handleSelectStep.bind(this);
    this.onIconFavoriteClicked = this.onIconFavoriteClicked.bind(this);
    this.onIconRatingsClicked = this.onIconRatingsClicked.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSaveRatings = this.handleSaveRatings.bind(this);
    this.state = {
      activeTab: TAB_OPTIONS[0],
      selectedStep: 1,
      opened: false,
      ratings: 0
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSelectTab(event) {
    this.setState({ activeTab: event.target.textContent });
  }

  handleSelectStep(stepIndex) {
    this.setState({ selectedStep: stepIndex });
  }

  onIconFavoriteClicked(event) {
    const { userRatings, id } = this.props.recipe;
    const favorited = userRatings && userRatings.isFavorited;
    const newData = Object.assign({}, userRatings, {id: id, isFavorited: !favorited});
    this.props.handleRecipeFavorite(newData);
  }

  onIconRatingsClicked(event) {
    if (!this.state.opened) {
      const { userRatings } = this.props.recipe;
      const ratings = userRatings && userRatings.ratingsCount
                                        ? userRatings.ratingsCount
                                        : this.state.ratings;

      this.setState({ opened: true, ratings: ratings });
    }
    else {
      const stars = parseFloat(event.target.getAttribute('value'));
      this.setState({ ratings: stars });
    }
  }

  handleSaveRatings(event) {
    const { userRatings, id } = this.props.recipe;
    const newData = Object.assign({}, userRatings, {id: id, ratingsCount: this.state.ratings});
    this.props.handleRecipeRatings(newData);
    this.setState({ opened: false });
  }

  handleModalClose() {
    this.setState({ opened: false });
  }

  renderRatingsModal() {
    const { userRatings } = this.props.recipe;
    return (
      <Modal
        opened={this.state.opened}
        onRequestClose={this.handleModalClose}
        onRequestSave={this.handleSaveRatings}
        title="Rate recipe"
        contentStyle={{
          height: 'auto'
        }}
      >
        <div>
          <div className="ratings-modal">
            <span className="icons-container">
              {new Array(5).fill('').map((val, i) => {
                const stars = i+1;
                const containerClass = classnames("icon-container", {'rated': stars <= this.state.ratings});
                return (
                  <a key={i} className={containerClass} onClick={this.onIconRatingsClicked}>
                    <i value={stars} className="fa fa-fw fa-star"/>
                  </a>
                );
              })}
            </span>
          </div>
        </div>
      </Modal>
    );
  }

  renderActionTabs(label) {
    const activeClass = classnames({
      'tab': true,
      'mustard-underline': this.state.activeTab === label
    });
    return (
      <span className={activeClass} key={label} onClick={this.handleSelectTab}>
        <span className="text-uppercase">{label}</span>
      </span>
    );
  }

  renderAdditionalInformation(tab) {
    const { recipe } = this.props;
    if (tab === 'details') {
      return (
        <RecipeDetails
          recipeDescription={recipe.description}
          prepTime={recipe.prepTime}
          yieldType={recipe.yieldType}
          yields={recipe.yields}
          nutrition={recipe.nutrition}/>
      );
    }
    else if (tab === 'ingredients') {
      return (
        <RecipeIngredients
          ingredients={recipe.ingredients}
          allergens={recipe.allergens}
          yields={recipe.yields}/>
      );
    }
    else if (tab === 'ratings') {
      return (
        <div/>
      );
    } else {
      return <span/>;
    }
  }

  renderInstructionSteps(steps) {
    return (
      <ul className="steps-list">
        {steps.map(step => {
          const isActive = this.state.selectedStep === step.index;
          const stepClass = classnames('step-action-button',{'active': isActive});
          return (
            <li className="steps" key={step.index}>
              <a className={stepClass} onClick={() => this.handleSelectStep(step.index)}>
                {step.images[0].caption}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { recipe } = this.props;

    if (!recipe) {
      return (
        <Spinner/>
      );

    } else {
      const { userRatings } = recipe;
      const selectedStepZeroBased = this.state.selectedStep - 1;
      const favoritesClass = classnames('icon-container', { favorited: userRatings && userRatings.isFavorited });
      const ratingsClass = classnames('icon-container', { rated: userRatings && userRatings.ratingsCount > 0 });

      return (
        <div id="recipe-page-main">
          {this.state.opened ? this.renderRatingsModal() : <span/>}
          <section className="section-recipe recipe-main">
            <div className="recipe-left">
              <div className="content-block img-container">
                <img className="recipe-image" src={recipe.imageLink} alt={recipe.name}/>
              </div>
            </div>
            <div className="recipe-right">
              <div className="header">
                <h1 className="title">{recipe.name}</h1>
                <h2 className="headline">{recipe.headline}</h2>
              </div>
              <div className="seperator"/>
              <div className="recipe-content">
                <div className="content-top">
                  <div className="tabs">
                    {TAB_OPTIONS.map(tab =>
                      this.renderActionTabs(tab)
                    )}
                  </div>
                  <div className="ratings">
                    <span>
                      <a className={ratingsClass} onClick={this.onIconRatingsClicked}>
                        <i className="fa fa-fw fa-star"/>
                      </a>
                    </span>
                    <span>
                      <a className={favoritesClass} onClick={this.onIconFavoriteClicked}>
                        <i className="fa fa-fw fa-heart"/>
                      </a>
                    </span>
                  </div>
                </div>
                <div className="content-body">
                  {this.renderAdditionalInformation(this.state.activeTab)}
                </div>
              </div>
            </div>
          </section>
          <section className="section-recipe recipe-instructions">
            <div className="header">
                <h1 className="title">Step-By-Step Instructions</h1>
            </div>
            <div className="instructions-container">
                <div className="instructions-left">
                  <div>
                    {this.renderInstructionSteps(recipe.steps)}
                  </div>
                </div>
                <div className="instructions-right">
                    <RecipeSteps
                      step={recipe.steps[selectedStepZeroBased]}
                      utensils={recipe.utensils}/>
                </div>
              </div>
          </section>
        </div>
      );
    }
  }
}

RecipeItemDetail.propTypes = {
  recipe: PropTypes.object,
  handleRecipeFavorite: PropTypes.func.isRequired,
  handleRecipeRatings: PropTypes.func.isRequired
};
