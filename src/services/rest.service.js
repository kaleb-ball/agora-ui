import {authHeader} from "../helpers";
import axios from "axios";

export const restService = {
    get,
    post,
    put,
    delete : _delete
};

let config

/**
 * This is a generic method for sending a GET request to the API using the axios library.
 * All GET requests should use this method.
 *
 * @param endpoint - the request endpoint (not including the host or API version)
 * @param authenticated - whether or not the authorization token should be added to the request
 * @param params - an optional field for any url query parameters
 */
function get(endpoint, authenticated, params = {}) {
    let headers = addHeaders(authenticated, false)
    const config = {
        headers : {...headers},
        params : params
    };
    return axios.get(endpoint, config)
}

/**
 * This is a generic method for sending a POST request to the API using the axios library.
 * All POST requests should use this method.
 *
 * @param endpoint - the request endpoint (not including the host or API version)
 * @param authenticated - whether or not the authorization token should be added to the request
 * @param payload - an optional field which contains the POST request JSON payload
 * @param params - an optional field for any url query parameters
 */
function post(endpoint, authenticated, payload = {}, params = {}) {
    config = {
        headers : addHeaders(authenticated, true),
        params : params
    }
    return axios.post(endpoint, JSON.stringify(payload), config)
}

/**
 * This is a generic method for sending a PUT request to the API using the axios library.
 * All PUT requests should use this method.
 *
 * @param endpoint - the request endpoint (not including the host or API version)
 * @param authenticated - whether or not the authorization token should be added to the request
 * @param payload - an optional field which contains the POST request JSON payload
 * @param params - an optional field for any url query parameters
 */
function put(endpoint, authenticated, payload = {} , params = {}) {
    config = {
        headers : addHeaders(authenticated, true),
        params : params
    }
    return axios.put(endpoint, payload, config)
}

/**
 * This is a generic method for sending a DELETE request to the API using the axios library.
 * All DELETE requests should use this method.
 *
 * @param endpoint - the request endpoint (not including the host or API version)
 * @param authenticated - whether or not the authorization token should be added to the request
 * @param params - an optional field for any url query parameters
 */
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