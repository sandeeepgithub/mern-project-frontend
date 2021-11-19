import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProtectedRoutes from '../components/ProtectedRoutes';
import ErrorComponent from '../components/ErrorComponent';
import NavbarComponent from '../components/NavbarComponent';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

function Routes({ isLoggedIn, logoutHandler }) {
    return (
        <>
            {
                isLoggedIn ?
                    <>
                        <NavbarComponent logoutHandler={logoutHandler} />
                        <Switch>
                            <ProtectedRoutes exact path="/profile" component={Profile} />
                            <ProtectedRoutes exact path="/" component={Home} />
                            <Route path="*" component={ErrorComponent} />
                        </Switch>
                    </>
                    :
                    <Redirect to="/login" />
            }
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route exact path="/signup" component={Signup} />
            </Switch>
        </>
    );
}

export default Routes;
