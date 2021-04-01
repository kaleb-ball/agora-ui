import { restService } from "./rest.service";
import {oauthConstants} from "../constants";

export const oauthService = {
    getUrl,
    getAccessToken,
    platformAuthenticated,
    isAuthenticated
}

const endpointBase = "platforms"

function getUrl(name) {
    const endpoint = `${endpointBase}`
    return restService.get(endpoint, true).then(
        (res)=> {
            return res.data.filter(x => x.name === name)[0].redirect_url.toString() + "&state=" + getState();
        }, (err) => {
            return err
        })
}

function getAccessToken(provider , code) {
    const endpoint = `${endpointBase}/${provider}`
    const params = {
        code : code
    }
    return restService.post(endpoint, true, params)

}

async function isAuthenticated() {
    let authenticated = false;
    await oauthService.platformAuthenticated(oauthConstants.PLATFORM_NAMES.ZOOM).then(
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

function platformAuthenticated(provider) {
    const endpoint = `${endpointBase}/${provider}/auth`
    return restService.get(endpoint, true)

}


function getState() {
    return generateNonce(64)
}

function generateNonce(length) {
    localStorage.removeItem("nonce")
    let nonce = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < length; i++) {
        nonce += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    localStorage.setItem("nonce", nonce)
    return nonce;
}
