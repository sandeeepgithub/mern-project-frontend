import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoutes({ component: Component, ...props }) {
    return (
        <Route {...props} render={(props) => <Component {...props} />} />
    );
}

export default ProtectedRoutes;
