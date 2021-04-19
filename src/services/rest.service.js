import {authHeader} from "../helpers";
import axios from "axios";

export const restService = {
    get,
    post,
    put,
    delete : _delete
};

let config

function get(endpoint, authenticated, params = {}) {
    let headers = addHeaders(authenticated, false)
    const config = {
        headers : {...headers},
        params : params
    };
    return axios.get(endpoint, config)
}

function post(endpoint, authenticated, payload = {}, params = {}) {
    config = {
        headers : addHeaders(authenticated, true),
        params : params
    }
    return axios.post(endpoint, JSON.stringify(payload), config)
}

function put(endpoint, authenticated, payload = {} , params = {}) {
    config = {
        headers : addHeaders(authenticated, true),
        params : params
    }
    return axios.put(endpoint, payload, config)
}

function _delete(endpoint, authenticated, params = {}) {
    config = {
        headers : addHeaders(authenticated, false),
        params : params
    };
    return axios.delete(endpoint, config)
}

function addHeaders(authenticated, json) {
    let headers = ''
    if (json && authenticated) {
        headers = {...authHeader(), 'Content-Type': 'application/json'}
    } else if (authenticated) {
        headers = {...authHeader()}
    } else if (json) {
        headers = {'Content-Type': 'application/json'}
    }
    return headers;
}