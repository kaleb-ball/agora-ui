import { restService } from "./rest.service";
import {oauthConstants} from "../constants";

export const oauthService = {
    getUrl,
    getAccessToken,
    platformAuthenticated,
    isAuthenticated
}

const endpointBase = "platform"

function getUrl(name) {
    return restService.get(endpointBase, '', true).then(
        (res)=> {
            return res.data.filter(x => x.name === name)[0].redirect_url.toString() + "&state=" + getState();
        }, (err) => {
            return err
        })
}

function getAccessToken(name, code) {
    let endpoint = endpointBase + "/" + name + "/auth?code=" + code;
    return restService.post(endpoint, null, true)

}

async function isAuthenticated() {
    let authenticated = false;
    await oauthService.platformAuthenticated(oauthConstants.ZOOM).then(
        (res) => {
            if (res.status === 200) {
                authenticated = true;
            }
    }).catch(
        () => {
            authenticated = false;
        }
    )
    return authenticated
}

function platformAuthenticated(name) {
    let endpoint = endpointBase + '/' + name + '/auth';
    return restService.get(endpoint, "", true)

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
