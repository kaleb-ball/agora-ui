import './App.less';
import {Route, Router, Switch} from "react-router-dom";
import {history} from "./helpers";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {OAuthPage, ZoomRedirectPage} from "./pages/OAuthPage";
import { HomePage } from "./pages/HomePage";
import React from "react";
import {alertActions} from "./actions";
import {connect} from "react-redux";
import Navbar from "./components/navbar/navbar";
import {AuthPage} from "./pages/AuthPage";

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
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/oauth" component={OAuthPage}/>
                        <Route path="/redirect" component={ZoomRedirectPage}/>
                        <Route path="/home" component={HomePage}/>
                        <Route path="/" component={LoginPage}/>
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