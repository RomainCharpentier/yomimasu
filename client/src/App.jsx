import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import APIErrorProvider from './providers/APIErrorProvider.jsx';
import { GuestRoute } from './routes/GuestRoute.jsx';
import { PrivateRoute } from './routes/PrivateRoute.jsx';
import { Topbar } from './components/Topbar.jsx';
import { APIErrorNotification } from './components/APIErrorNotification.jsx';
import { Signin } from './pages/Signin.jsx';
import { Signup } from './pages/Signup.jsx';
import { Profile } from './pages/Profile.jsx';
import { Signout } from './pages/Signout.jsx';
import BookList from './pages/BookList.jsx';
import { Write } from './pages/Write.jsx';
import { Home } from './pages/Home.jsx';
import { Users } from './pages/Users.jsx';
import { User } from './pages/User.jsx';
import Book from './pages/Book.jsx';
import styles from './App.module.scss';

class App extends Component {
  
  render() {
        return (
            <APIErrorProvider>
                <div className={styles.App}>
                    <Topbar />
                    <div className={styles.AppContent}>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <GuestRoute exact path="/signin" component={Signin}/>
                            <GuestRoute exact path ="/signup" component={Signup}/>
                            <PrivateRoute path='/profile' component={Profile} />
                            <PrivateRoute exact path='/book_list' component={BookList} />
                            <PrivateRoute path='/book_list/:id' component={Book} />
                            <PrivateRoute path='/write' component={Write} />
                            <PrivateRoute exact path='/users' component={Users} />
                            <PrivateRoute path='/users/:id' component={User} />
                            <PrivateRoute path='/signout' component={Signout} />
                        </Switch>
                    </div>
                </div>
                <APIErrorNotification />
            </APIErrorProvider>
        );
    }
}

export default App;