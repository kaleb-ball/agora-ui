import { restService } from "./rest.service";

export const oauthService = {
    getUrl,
    getAccessToken,
    isAuthorized,
    authenticatedPlatforms
}

const endpointBase = "platforms"

/**
 * Returns redirect url for a given platform
 *
 * @param platform - Video conferencing platform value
 */
function getUrl(platform) {
    const endpoint = `${endpointBase}`
    return restService.get(endpoint, true).then(
        (res)=> {
            return res.data.filter(x => x.name === platform)[0].redirect_url.toString() + "&state=" + getState();
        }, (err) => {
            return err
        })
}

/**
 * Sends access token to API to complete OAuth flow
 *
 * @param platform - video conferencing platform
 * @param code - code returned from platform to continue OAuth flow in API
 */
function getAccessToken(platform , code) {
    const endpoint = `${endpointBase}/${platform}/auth`
    const params = {
        code : code
    }
    return restService.post(endpoint, true, {}, params)

}

/**
 * Returns whether or not a user is authorized to one or more meeting platforms
 */
async function isAuthorized() {
    const platforms = await authenticatedPlatforms()
    return platforms.length >= 1;
}

/**
 * Returns an array of platforms a user is authenticated to
 */
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
