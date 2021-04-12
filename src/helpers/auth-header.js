export function authHeader() {
    let token = JSON.parse(localStorage.getItem('auth-token'));

    if (token) {
        return { 'Authorization':'Bearer ' + token };
    } else {
        return {};
    }
}