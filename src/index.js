import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App }  from './App'
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {history, store} from "./helpers";
import axios from "axios";
import {API_ROOT } from './helpers/api-root-config'

axios.defaults.baseURL = `${API_ROOT}`
axios.defaults.responseType = "json"


axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 500) {
        history.push("/500")
    }
    return Promise.reject(error);
});

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
