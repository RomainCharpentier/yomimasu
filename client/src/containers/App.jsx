import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import APIErrorProvider from '../providers/APIErrorProvider.jsx';
import { GuestRoute } from '../routes/GuestRoute.jsx';
import { PrivateRoute } from '../routes/PrivateRoute.jsx';
import { Topbar } from '../components/Topbar.jsx';
import { APIErrorNotification } from '../components/APIErrorNotification.jsx';
import { Signin } from './Signin.jsx';
import { Signup } from './Signup.jsx';
import { Profile } from './Profile.jsx';
import { Signout } from './Signout.jsx';
import BookListStore from './BookList.jsx';
import { Write } from './Write.jsx';
import { Home } from './Home.jsx';
import { Users } from './Users.jsx';

class App extends Component {

    render() {
        return (
            <APIErrorProvider>
                <div className="App">
                    <Topbar />
                    <div className="App-content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <GuestRoute exact path="/signin" component={Signin} />
                            <GuestRoute exact path="/signup" component={Signup} />
                            <PrivateRoute path='/profile' component={Profile} />
                            <PrivateRoute path='/book_list' component={BookListStore} />
                            <PrivateRoute path='/write' component={Write} />
                            <PrivateRoute path='/users' component={Users} />
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