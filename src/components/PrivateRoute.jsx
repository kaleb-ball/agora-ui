import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Checks to make sure a user is logged in before navigating them to that route. If unauthenticated, the user is redirected
 * to a 401 page.
 */
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('auth-token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/401', state: { from: props.location }}} />
    )} />
)