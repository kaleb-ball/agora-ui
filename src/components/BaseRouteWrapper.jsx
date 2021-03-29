import {Redirect, Route} from 'react-router-dom'
import * as React from "react";
import {HomePage} from "../pages/HomePage";

export const BaseRouteWrapper = () => (
    <Route render={props => (
        localStorage.getItem('user')
            ? <HomePage />
            : <Redirect to={{ pathname: '/auth'}} />
    )} />
)