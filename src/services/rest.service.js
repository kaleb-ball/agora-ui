import { API_ROOT } from "../helpers/api-config";
import {authHeader} from "../helpers/auth-header";
import {userService} from "./user.service";

export const restService = {
    get,
    post,
    put,
    delete : _delete
};

let requestOptions;

function get(endpoint, param, authenticated) {
    requestOptions = {
        method : 'GET',
        headers : headers(authenticated, false)
    };
    return fetch(`${API_ROOT}/${endpoint}/${param}`, requestOptions).then(handleResponse);
}

function post(endpoint, payload, authenticated) {
    requestOptions = {
        method: 'POST',
        headers : headers(authenticated, true),
        body: JSON.stringify(payload)
    }
    return fetch(`${API_ROOT}/${endpoint}`, requestOptions).then(handleResponse);
}

function put (endpoint, payload, authenticated) {
    requestOptions = {
        method: 'PUT',
        headers : headers(authenticated, true),
        body: JSON.stringify(payload)
    }
    return fetch(`${API_ROOT}/${endpoint}`, requestOptions).then(handleResponse);
}

function _delete(endpoint, param, authenticated) {
    requestOptions = {
        method : 'DELETE',
        headers : headers(authenticated, false)
    };
    return fetch(`${API_ROOT}/${endpoint}/${param}`, requestOptions).then(handleResponse);
}

function headers(authenticated, json) {
    let headers = ''
    if (json && authenticated) {
        headers = {...authHeader(), 'Content-Type': 'application/json'}
    } else if (authenticated) {
        headers = authHeader()
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
