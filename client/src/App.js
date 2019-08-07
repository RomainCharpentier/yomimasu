import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Signin } from './components/Signin/Signin.js';
import { Signup } from './components/Signup/Signup.js';
import { Topbar } from './components/Topbar/Topbar.js';
import { Profile } from './components/Profile/Profile.js';
import { Signout } from './components/Signout/Signout.js';
import { PrivateRoute } from './components/PrivateRoute.js';
import { GuestRoute } from './components/GuestRoute.js';
import { Home } from './components/Home/Home.js';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Topbar />
        <div className="App-content">
            <Switch>
                <Route exact path="/" component={Home}/>
                <GuestRoute exact path="/signin" component={Signin}/>
                <GuestRoute exact path ="/signup" component={Signup}/>
                <PrivateRoute path='/profile' component={Profile} />
                <PrivateRoute path='/signout' component={Signout} />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;