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
import {authService} from "./services";
import {fromUnixTime} from 'date-fns'
import {alertActions} from "./actions";


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
    let expireAt = localStorage.getItem('expiresAt') ? fromUnixTime(JSON.parse(localStorage.getItem('expiresAt'))) : null
    if (expireAt && differenceInMinutes(expireAt, Date.now()) < 1 && config.headers.Authorization && !config.url.startsWith("auth")) {
          await authService.refresh().then(
            (res) => { config.headers.Authorization = authHeader().Authorization}
        ).catch(
            (error) => {
                authService.logout();
                alertActions.error(error)
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
