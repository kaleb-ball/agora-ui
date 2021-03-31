import {authHeader} from "../helpers";
import {userService} from "./user.service";
import axios from "axios";

export const restService = {
    get,
    post,
    put,
    delete : _delete
};

let config

function get(endpoint, param, authenticated) {
    let headers = addHeaders(authenticated, false)
    const config = {
        headers : {...headers}
    };
    return axios.get(endpoint, config)
}

function post(endpoint, payload, authenticated) {
    config = {
        headers : addHeaders(authenticated, true)
    }
    return axios.post(endpoint, JSON.stringify(payload), config)
}

function put(endpoint, payload, authenticated) {
    config = {
        headers : addHeaders(authenticated, true),
    }
    return axios.put(endpoint, payload, config)
}

function _delete(endpoint, authenticated) {
    config = {
        headers : addHeaders(authenticated, false)
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

function handleResponse (response) {
    return response.text().then(text=> {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                userService.logout();
                window.location.reload();
            }
            const error = (data && data.message()) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
