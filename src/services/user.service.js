import { restService } from "./rest.service";

export const userService = {
    login,
    logout,
    register
}

function login(username, password) {
    let payload = {
        credentials : {
            Username: username,
            Password : password
        }
    }
    return restService.post("auth", payload, false).then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    })
}

function logout() {
    localStorage.removeItem('user');
}


function register(user) {
    let payload = {
        Firstname : user.firstname,
        Lastname : user.lastname,
        Username : user.username,
        Password : user.password
    }

    return restService.post("user", payload, false).then(data => {

    })
}