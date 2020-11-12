import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SiderDemo from './components/menu/menu';
import Login from './components/login/login.component';
function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/dashboard">
          <SiderDemo route='dashboard' />
        </Route>
        <Route exact path="/settings">
          <SiderDemo route='settings' />
        </Route>
        <Route exact path="/users">
          <SiderDemo route='users' />
        </Route>
        <Route exact path="/contacts">
          <SiderDemo route='contacts' />
        </Route>
        <Route exact path="/list">
          <SiderDemo route='list' />
        </Route>
      </Switch>
    </Router>
</>
  );
}


export default App;

