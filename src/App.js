import './App.less';
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {history} from "./helpers";
import {OAuthPage, ZoomRedirectPage} from "./pages/OAuthPage";
import { HomePage } from "./pages/HomePage";
import { Exception404Page, Exception500Page, Exception401Page } from "./pages/ExceptionPages/index";
import React from "react";
import {alertActions} from "./actions";
import {connect} from "react-redux";
import Navbar from "./components/navbar/navbar";
import {AuthPage} from "./pages/AuthPage";
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
                        <Route path="/auth" component={AuthPage}/>
                        <Route path="/oauth" component={OAuthPage}/>
                        <Route path="/redirect" component={ZoomRedirectPage}/>
                        <Route path="/home" component={HomePage}/>
                        <Route path="/" component={AuthPage}/>
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