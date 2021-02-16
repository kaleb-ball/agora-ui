import './App.less';
import {Route, Router, Switch} from "react-router-dom";
import {history} from "./helpers";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {ServiceAuthPage} from "./pages/ServiceAuthPage";
import React from "react";
import {alertActions} from "./actions";
import {connect} from "react-redux";

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
                <Router history={history}>
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/serviceAuth" component={ServiceAuthPage}/>
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