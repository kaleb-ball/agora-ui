let host = process.env.REACT_APP_SERVER_URL;
const version = 'v1';


export const OAUTH_CALLBACK = `${host}/callback`
export const API_ROOT = `${host}/${version}`;