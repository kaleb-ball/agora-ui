import {Redirect, Route} from 'react-router-dom'
import * as React from "react";
import {HomePage} from "../pages/HomePage";

/**
 * When a user navigates to "/", this component checks to see if they are logged in. If they are, they are sent to the home page;
 * if not they are sent to the auth page.
 */
export const BaseRouteWrapper = () => (
    <Route render={props => (
        localStorage.getItem('auth-token')
            ? <HomePage />
            : <Redirect to={{ pathname: '/auth'}} />
    )} />
)