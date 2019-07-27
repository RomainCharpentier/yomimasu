import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard.js';
import { Login } from './components/Login/Login.js';
import { Signup } from './components/Signup/Signup.js';
import { Topbar } from './components/Topbar/Topbar.js';
import { Profile } from './components/Profile/Profile.js';
import { PrivateRoute } from './components/PrivateRoute.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Topbar />
        <div className="App-content">
            <Switch>  
                <Route exact path="/" component={Login}/>
                <Route exact path ="/signup" component={Signup}/>
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/profile' component={Profile} />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;