import { restService } from "./rest.service";

export const userService = {
    login,
    logout,
    register
}

function login(username, password) {
    let payload = {
        username: username,
        password : password
    }
    return restService.post("auth", payload, false).then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    })
}

function logout() {
    localStorage.removeItem('user');
}


function register(firstname, lastname, username, password) {
    let payload = {
        Firstname : firstname,
        Lastname : lastname,
        Username : username,
        Password : password
    }

    return restService.post("user", payload, false).then(data => {

    })
}