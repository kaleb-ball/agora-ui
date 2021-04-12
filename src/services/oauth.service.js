import { restService } from "./rest.service";

export const oauthService = {
    getUrl,
    getAccessToken,
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
    const platforms = await authenticatedPlatforms()
    return platforms.length >= 1;
}

async function authenticatedPlatforms() {
    let platforms = [];
    const endpoint = `users/me/${endpointBase}`
    await restService.get(endpoint, true).then(
        (res) => {
            platforms = res.data ? res.data : []
    })
    localStorage.setItem('authenticatedPlatforms', JSON.stringify(platforms))
    return platforms;
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
