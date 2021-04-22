import './App.less';
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {history} from "./helpers";
import {OAuthPage} from "./pages/OAuthPage";
import { HomePage } from "./pages/HomePage";
import { Exception404Page, Exception500Page, Exception401Page } from "./pages/ExceptionPages/index";
import React from "react";
import {alertActions} from "./actions";
import {connect} from "react-redux";
import { NavbarComponent } from "./components/navbar/NavbarComponent";
import {AuthPage} from "./pages/AuthPage";
import {PrivateRoute, BaseRouteWrapper} from "./components";
import {RedirectPage} from "./pages/OAuthPage";
import {MeetingsPage} from "./pages/MeetingsPage/MeetingsPage";
import {Content} from "antd/es/layout/layout";

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
                <NavbarComponent/>
                <Content>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/auth" component={AuthPage}/>
                            <PrivateRoute exact path="/oauth" component={OAuthPage}/>
                            <PrivateRoute exact path="/redirect/*" component={RedirectPage}/>
                            <PrivateRoute exact path="/home" component={HomePage}/>
                            <PrivateRoute exact path="/meetings" component={MeetingsPage}/>
                            <Route exact path="/401" component={Exception401Page} />
                            <Route exact path="/404" component={Exception404Page}/>
                            <Route exact path="/500" component={Exception500Page}/>
                            <Route exact path="/" component={BaseRouteWrapper}/>
                            <Redirect to="/404"/>
                        </Switch>
                    </Router>
                </Content>
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