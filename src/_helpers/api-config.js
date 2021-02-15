let host;
const version = 'v1';

const hostname = window && window.location.hostname;

if (hostname === 'prod.agora.io') {
    //host = 'https://api.prod.io'
} else if (hostname === 'dev.agora.io') {
    //host = 'https://api.agora.io'
} else {
    host = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';
}

export const API_ROOT = `${host}/${version}`;