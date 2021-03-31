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
    let payload = {
        credentials : {
            Username: username,
            Password : password
        }
    }
    return restService.post(endpointBase, payload, false).then(res => {
        setToken(res)
    })
}

function logout() {
    localStorage.removeItem('user');
    history.push("auth")
    return restService.delete(endpointBase, true)
}


function register(user) {
    let payload = {
        Firstname : user.firstname,
        Lastname : user.lastname,
        Username : user.username,
        Password : user.password
    }
    return restService.post("users", payload, false)
}

function refresh() {
    let endpoint = endpointBase + '/refresh'
    return restService.post(endpoint, {}, true).then(
        (res)=> { setToken(res)}
    ).catch(()=> { return Promise.reject("Session expired. Please login again.")})
}

function setToken(res) {
    localStorage.setItem('user', JSON.stringify(res));
    const expiresAt = jwtDecode(res.data.token).exp;
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt))
}
