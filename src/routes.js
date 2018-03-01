import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import RecipePage from './containers/RecipePage';
import RecipeDetailsPage from './containers/RecipeDetailsPage';

function AppRouter(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={LoginPage} />
      <Route path="/recipes" component={RecipePage}/>
      <Route path="/recipes/:recipe_id" component={RecipeDetailsPage}/>
    </Route>
  );
}


export default AppRouter;
