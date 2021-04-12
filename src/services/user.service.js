import { restService } from "./rest.service";
import jwtDecode from "jwt-decode";
import { history } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    refresh
}

let endpointBase = "auth"

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

function logout() {
    const endpoint = `${endpointBase}`
    localStorage.removeItem('auth-token');
    localStorage.removeItem('authenticatedPlatforms')
    history.push("auth")
    return restService.delete(endpoint, true)
}


function register(user) {
    const data = {
        Firstname : user.firstname,
        Lastname : user.lastname,
        Username : user.username,
        Password : user.password
    }
    return restService.post("users", false, data)
}

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
