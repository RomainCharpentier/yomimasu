import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import APIErrorProvider from './providers/APIErrorProvider';
import { GuestRoute } from './routes/GuestRoute';
import { PrivateRoute } from './routes/PrivateRoute';
import Topbar from './components/Topbar';
import { APIErrorNotification } from './components/APIErrorNotification';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { Signout } from './pages/Signout';
import BookList from './pages/BookList';
import { Write } from './pages/Write';
import { Home } from './pages/Home';
import { Users } from './pages/Users';
import User from './pages/User';
import Book from './pages/Book';
import styles from './App.module.scss';
import { ErrorDisplayBoundary, ErrorContext } from './ErrorContext';

function ErrorOutlet() {
    const { error } = useContext(ErrorContext)
  
    return (
      error && (
        <div class="alert alert-danger" role="alert">
          {error.message}
        </div>
      )
    )
  }

const App = () => {

    return (
        <APIErrorProvider>
            <div className={styles.App}>
                <Topbar />
                <div className={styles.AppContent}>
                    <ErrorDisplayBoundary>
                        <ErrorOutlet />
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
                    </ErrorDisplayBoundary>
                </div>
            </div>
            <APIErrorNotification />
        </APIErrorProvider>
    );
}

export default App;