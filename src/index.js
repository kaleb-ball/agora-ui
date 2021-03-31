import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App }  from './App'
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {authHeader, history, store} from "./helpers";
import axios from "axios";
import {API_ROOT } from './helpers/api-root-config'
import { differenceInMinutes } from 'date-fns'
import {userService} from "./services";
import * as json from "@babel/core";
import {fromUnixTime} from 'date-fns'
import {alertActions} from "./actions";
import {alertConstants} from "./constants";

const cancelTokenSource = axios.CancelToken.source()

axios.defaults.baseURL = `${API_ROOT}`
axios.defaults.responseType = "json"
axios.defaults.withCredentials = true;


axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (!error.response) {
        error = { response : { data : { error : "Failed to connect to the server" } } }
        history.push("/500")
        return Promise.reject(error)
    }
    return Promise.reject(error);
});
axios.interceptors.request.use(async (config) => {
    let expireAt = fromUnixTime(Date.parse(JSON.parse(localStorage.getItem('expiresAt'))))
    if (differenceInMinutes(new Date(), expireAt) < 5 && config.url !== "auth" && config.url !== "auth/refresh") {
          await userService.refresh().then(
            (res) => {
                config.headers.Authorization = authHeader().Authorization;
            }
        ).catch(
            (error) => {
                userService.logout();
                alertActions.error(error, alertConstants.ALERT_LENGTH)
                return Promise.reject();
        })
    }

    return config
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
