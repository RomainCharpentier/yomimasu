import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GuestRoute } from './routes/GuestRoute.js';
import { PrivateRoute } from './routes/PrivateRoute.js';
import { Topbar } from './components/Topbar.js';
import { Signin } from './pages/Signin.js';
import { Signup } from './pages/Signup.js';
import { Profile } from './pages/Profile.js';
import { Signout } from './pages/Signout.js';
import { BookList } from './pages/BookList.js';
import { Write } from './pages/Write.js';
import { Home } from './pages/Home.js';
import { Users } from './pages/Users.js';
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
                <PrivateRoute path='/book_list' component={BookList} />
                <PrivateRoute path='/write' component={Write} />
                <PrivateRoute path='/users' component={Users} />
                <PrivateRoute path='/signout' component={Signout} />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;