import { restService } from "./rest.service";
import jwtDecode from "jwt-decode";
import { history } from '../helpers';

export const authService = {
    login,
    logout,
    register,
    refresh
}

let endpointBase = "auth"

/**
 * Logs user in the API. On success, it sets an authentication token in browser storage.
 *
 * @param username
 * @param password
 */
function login(username, password) {
    const endpoint = `${endpointBase}`
    const data = {
        credentials : {
            Username: username,
            Password : password
        }
    }
    return restService.post(endpoint, false, data).then(res => {
        setToken(res)
    })
}

/**
 * Invalidates user session in API. Deletes all information about user's session in browser storage.
 *
 */
function logout() {
    const endpoint = `${endpointBase}`
    localStorage.removeItem('auth-token');
    localStorage.removeItem('authenticatedPlatforms')
    localStorage.removeItem('user')
    history.push("auth")
    return restService.delete(endpoint, true)
}


/**
 * Registers user in API.
 *
 * @param user - object representing new user
 */
function register(user) {
    const data = {
        Firstname : user.firstname,
        Lastname : user.lastname,
        Username : user.username,
        Password : user.password
    }
    return restService.post("users", false, data)
}


/**
 * Refreshes user token in browser storage. If the refresh token is expired, the user is logged out.
 */
function refresh() {
    let endpoint = `${endpointBase}/refresh`
    return restService.post(endpoint, true).then(
        (res)=> { setToken(res)}
    ).catch(()=> { return Promise.reject("Session expired. Please login again.")})
}

function setToken(res) {
    localStorage.setItem('auth-token', JSON.stringify(res.data.token));
    const expiresAt = jwtDecode(res.data.token).exp;
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt))
}
