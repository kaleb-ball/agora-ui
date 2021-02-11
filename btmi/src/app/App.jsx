import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { PrivateRoute } from '../_components';
import { LoginPage } from '../pages/LoginPage';
import {RegisterPage} from "../pages/RegisterPage";

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">Alert</div>
                    <Router history={history}>
                        <Switch>
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/register" component={RegisterPage}/>
                            <Route path="/" component={LoginPage}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        )
    }

}

function mapState(state) {
}

const actionCreators = {
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };