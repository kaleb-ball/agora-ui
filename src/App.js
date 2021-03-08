import './App.less';
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {history} from "./helpers";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {OAuthPage, ZoomRedirectPage} from "./pages/OAuthPage";
import { HomePage } from "./pages/HomePage";
import { Exception404Page, Exception500Page, Exception401Page } from "./pages/ExceptionPages/index";
import React from "react";
import {alertActions} from "./actions";
import {connect} from "react-redux";
import Navbar from "./components/navbar/navbar";
import {PrivateRoute, BaseRouteWrapper} from "./components";

class App extends React.Component {

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        });

    }


    render() {
        return (
            <div>
                <Navbar/>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <PrivateRoute exact path="/oauth" component={OAuthPage}/>
                        <PrivateRoute exact path="/redirect" component={ZoomRedirectPage}/>
                        <PrivateRoute exact path="/home" component={HomePage}/>
                        <Route exact path="/401" component={Exception401Page} />
                        <Route exact path="/404" component={Exception404Page}/>
                        <Route exact path="/500" component={Exception500Page}/>
                        <Route exact path="/" component={BaseRouteWrapper}/>
                        <Redirect to="/404"/>
                    </Switch>
                </Router>
            </div>
        );
    }

}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };