import { restService } from "./rest.service";

export const oauthService = {
    getUrl,
    getAccessToken
}

function getUrl(name) {
    return restService.get("platform", '', true).then(
        (res)=> {
            return res.data.filter(x => x.name === name)[0].redirect_url.toString() + "&state=" + getState();
        }, (err) => {
            return err
        })
}

function getAccessToken(name, code) {
    let endpoint = "platform/" + name + "/auth?code=" + code;
    let res = restService.post(endpoint, null, true)
    return res;

}



function getState() {
    return generateNonce(64)
}

function generateNonce(length) {
    localStorage.removeItem("nonce")
    var nonce = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        nonce += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    localStorage.setItem("nonce", nonce)
    return nonce;
}
