import { restService } from "./rest.service";

export const userService = {
    login,
    logout,
    register
}

let baseEndpoint = "auth"

function login(username, password) {
    let payload = {
        credentials : {
            Username: username,
            Password : password
        }
    }
    return restService.post(baseEndpoint, payload, false).then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    })
}

function logout() {
    localStorage.removeItem('user');
    return restService.delete(baseEndpoint, true)
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