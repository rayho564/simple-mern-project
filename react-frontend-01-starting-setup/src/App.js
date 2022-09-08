import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'

// This all a single HTML page, but with react routing it re-renders based on the path
const App = () => {
  // Redirect brings them to a page you want if an incorrect path is given
  // Route set in Router allows you to show a page/component for a certain path given
  // Switch allows it when it finds a matching path then it ends instead of continue evaluating
  
  return <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>;
}

export default App;
