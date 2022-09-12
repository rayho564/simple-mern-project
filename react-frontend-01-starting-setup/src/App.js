import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

// This all a single HTML page, but with react routing it re-renders based on the path
const App = () => {
  // Redirect brings them to a page you want if an incorrect path is given
  // Route set in Router allows you to show a page/component for a certain path given
  // Switch allows it when it finds a matching path then it ends instead of continue evaluating
  
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          {/* doing /: extracts the userId as dynamic */}
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
