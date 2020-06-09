import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/">
            <Home />

          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
