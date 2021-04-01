import { restService } from "./rest.service";
import {oauthConstants} from "../constants";

export const oauthService = {
    getUrl,
    getAccessToken,
    platformAuthenticated,
    isAuthorized,
    authenticatedPlatforms
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

function getAccessToken(platform , code) {
    const endpoint = `${endpointBase}/${platform}/auth`
    const params = {
        code : code
    }
    return restService.post(endpoint, true, {}, params)

}

async function isAuthorized() {
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

/*async function isAuthorized() {
    authenticatedPlatforms()
    if (!localStorage.getItem('authenticatedPlatforms')) authenticatedPlatforms();
    return JSON.parse(localStorage.getItem('authenticatedPlatforms')).platforms.length >= 1;
}*/

function authenticatedPlatforms() {
    //implement
    const platforms =
        {
            platforms : [
                'zoom'
            ]
        }
    localStorage.setItem('authenticatedPlatforms', JSON.stringify(platforms))
    return platforms
}


//Remove
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
