import { API_ROOT} from "../helpers/api-root-config";
import {authHeader} from "../helpers/auth-header";
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
        // method: 'POST',
        headers : addHeaders(authenticated, true)
        //body: JSON.stringify(payload)
    }
    return axios.post(endpoint, JSON.stringify(payload), config)
    //return fetch(`${API_ROOT}/${endpoint}`, requestOptions).then(handleResponse);
}

function put(endpoint, payload, authenticated) {
    config = {
        // method: 'PUT',
        headers : addHeaders(authenticated, true),
        //body: JSON.stringify(payload)
    }
}

function _delete(endpoint, param, authenticated) {
    config = {
        // method : 'DELETE',
        headers : addHeaders(authenticated, false)
    };
    //return fetch(`${API_ROOT}/${endpoint}/${param}`, requestOptions).then(handleResponse);
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
