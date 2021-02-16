import './App.less';
import {Button} from "antd";
import {Route, Router, Switch} from "react-router-dom";
import {history} from "./_helpers";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {ServiceAuthPage} from "./pages/ServiceAuthPage";
import React from "react";

function App() {
  return (
      <div>
        <Button type="primary">
        Button
        </Button>
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

export default App;